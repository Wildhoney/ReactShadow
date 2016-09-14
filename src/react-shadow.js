import { get as fetch } from 'axios';
import React, { Component, PropTypes, DOM, Children } from 'react';
import { render, findDOMNode } from 'react-dom';
import dissoc from 'ramda/src/dissoc';
import memoize from 'ramda/src/memoize';

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
 * @method fetchStylesheet
 * @param {String} document
 * @return {Promise}
 */
const fetchStylesheet = memoize(document => fetch(document).then(response => response.data));

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
        cssDocuments: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
        nodeName: PropTypes.string,
        boundaryMode: PropTypes.oneOf(['open', 'closed'])
    };

    /**
     * @constant defaultProps
     * @type {Object}
     */
    static defaultProps = {
        cssDocuments: [],
        nodeName: 'span',
        boundaryMode: 'open'
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

        // Create the shadow root and take the CSS documents from props.
        const node = findDOMNode(this);
        const root = node.attachShadow ? node.attachShadow({ mode: this.props.boundaryMode }) : node.createShadowRoot();
        const cssDocuments = this.props.cssDocuments;
        const container = this.getContainer();

        // Render the passed in component to the shadow root, and then `setState` if there
        // are no CSS documents to be resolved.
        render(container, root);
        !cssDocuments.length && this.setState({ root });

        if (cssDocuments.length) {

            // Otherwise we'll fetch and attach the passed in stylesheets which need to be
            // resolved before `state.resolved` becomes `true` again.
            this.setState({ resolving: true, root });
            this.attachStylesheets(this.props.cssDocuments);

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
     * @method attachStylesheets
     * @param cssDocuments {Array|String}
     * @return {void}
     */
    attachStylesheets(cssDocuments) {

        const styleElement = document.createElement('style');
        styleElement.setAttribute('type', 'text/css');
        const documents = Array.isArray(cssDocuments) ? cssDocuments : [cssDocuments];

        /**
         * @method insertStyleElement
         * @param {Array} cssDocuments
         * @return {void}
         */
        const insertStyleElement = cssDocuments => {

            styleElement.innerHTML = cssDocuments.reduce((accumulator, document) => {
                return `${accumulator} ${document}`;
            });

            this.state.root.appendChild(styleElement);

        };

        Promise.all(documents.map(fetchStylesheet)).then(cssDocuments => {
            insertStyleElement(cssDocuments);
            this.setState({ resolving: false });
        });

    }

    /**
     * @method performSanityCheck
     * @return {void}
     */
    performSanityCheck() {

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
        this.performSanityCheck();

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
