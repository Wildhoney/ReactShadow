import { get as fetch } from 'axios';
import React, { Component, PropTypes, DOM, Children } from 'react';
import { render, findDOMNode } from 'react-dom';
import dissoc from 'ramda/src/dissoc';
import memoize from 'ramda/src/memoize';
import groupBy from 'ramda/src/groupBy';

/**
 * @method raise
 * @param {String} message
 * @throws {Error}
 * @return {void}
 */
const raise = message => {
    throw new Error(`ReactShadow: ${message}.`);
};

/**
 * @method fetchInclude
 * @param {String} document
 * @return {Promise}
 */
const fetchInclude = memoize(document => {

    return new Promise(resolve => {
        fetch(document).then(response => response.data).then(resolve).catch(() => resolve(''));
    });

});

/**
 * @constant includeMap
 * @type {Object}
 */
const includeMap = [
    {
        extensions: ['js'], tag: 'script', attrs: {
            type: 'text/javascript'
        }
    },
    {
        extensions: ['css'], tag: 'style', attrs: {
            type: 'text/css'
        }
    }
];

/**
 * @class ShadowDOM
 * @extends Component
 */
export default class ShadowDOM extends Component {

    /**
     * @constant propTypes
     * @type {Object}
     */
    static propTypes = {
        children: PropTypes.node.isRequired,
        include: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
        nodeName: PropTypes.string,
        boundaryMode: PropTypes.oneOf(['open', 'closed']),
        delegatesFocus: PropTypes.bool
    };

    /**
     * @constant defaultProps
     * @type {Object}
     */
    static defaultProps = {
        include: [],
        nodeName: 'span',
        boundaryMode: 'open',
        delegatesFocus: false
    };

    /**
     * @constructor
     */
    constructor() {
        super();
        this.state = { resolving: false };
    }

    /**
     * @method getContainer
     * @return {Object}
     */
    getContainer() {

        // Wrap children in a container if it's an array of children, otherwise
        // simply render the single child which is a valid `ReactElement` instance.
        const children = this.props.children.props.children;
        return children.length ? <this.props.nodeName>{children}</this.props.nodeName> : children;

    }

    /**
     * @method componentDidMount
     * @return {void}
     */
    componentDidMount() {

        const { boundaryMode: mode, delegatesFocus} = this.props;

        // Create the shadow root and take the CSS documents from props.
        const node = findDOMNode(this);
        const root = node.attachShadow ? node.attachShadow({ mode, delegatesFocus }) : node.createShadowRoot();
        const include = Array.isArray(this.props.include) ? this.props.include : [this.props.include];
        const container = this.getContainer();

        // Render the passed in component to the shadow root, and then `setState` if there
        // are no CSS documents to be resolved.
        render(container, root);
        !include.length && this.setState({ root });

        if (include.length) {

            // Otherwise we'll fetch and attach the passed in stylesheets which need to be
            // resolved before `state.resolved` becomes `true` again.
            this.setState({ resolving: true, root });
            this.attachIncludes(include);

        }

    }

    /**
     * @method componentDidUpdate
     * @return {void}
     */
    componentDidUpdate() {

        // Updates consist of simply rendering the container element into the shadow root
        // again, as the `this.getContainer()` element contains the passed in component's
        // children.
        render(this.getContainer(), this.state.root);

    }

    /**
     * @method attachIncludes
     * @param include {Array|String}
     * @return {void}
     */
    attachIncludes(include) {

        // Group all of the includes by their extension.
        const groupedFiles = groupBy(file => file.extension)(include.map(path => ({ path, extension: path.split('.').pop() })));

        const includeFiles = Object.keys(groupedFiles).map(extension => {

            const nodeData = includeMap.find(model => model.extensions.includes(extension));
            const files = groupedFiles[extension].map(model => model.path);

            if (!nodeData) {
                raise(`Files with extension of "${extension}" are unsupported`);
            }

            const containerElement = document.createElement(nodeData.tag);

            // Apply all of the attributes defined in the `includeMap` to the node.
            Object.keys(nodeData.attrs).map(key => containerElement.setAttribute(key, nodeData.attrs[key]));

            // Load each file individually and then concatenate them.
            return Promise.all(files.map(fetchInclude)).then(fileData => {
                containerElement.innerHTML = fileData.reduce((acc, fileDatum) => `${acc} ${fileDatum}`).trim();
                containerElement.innerHTML.length && this.state.root.appendChild(containerElement);
            });

        });

        Promise.all(includeFiles).then(() => this.setState({ resolving: false }));

    }

    /**
     * @method performSanityChecks
     * @return {void}
     */
    performSanityChecks() {

        // Ensure that the passed child isn't an array of children.
        Array.isArray(this.props.children) && raise('You must pass a single child rather than multiple children');

        if (typeof this.props.children.type !== 'string') {

            // Ensure that the passed child has a valid node name.
            raise('Passed child must be a concrete HTML element rather than another React component');

        }

    }

    /**
     * @method render
     * @return {XML}
     */
    render() {

        // Process the necessary sanity checks.
        this.performSanityChecks();

        // Take all of the props from the passed in component, minus the `children` props
        // as that's handled by `componentDidMount`.
        const child = Children.only(this.props.children);
        const props = dissoc('children', child.props);
        const className = this.state.resolving ? 'resolving' : 'resolved';

        // Determine whether to use `class` or `className`, as custom elements do not allow
        // for `className`. See: https://github.com/facebook/react/issues/4933
        const classNames = `${props.className ? props.className : ''} ${className}`.trim();
        const isSupportedElement = child.type in DOM;
        const propName = isSupportedElement ? 'className' : 'class';

        return <child.type {...{ ...dissoc('className', props), [propName]: classNames }} />;

    }

}
