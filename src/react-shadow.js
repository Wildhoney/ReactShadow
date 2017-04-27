import { get as fetch }                               from 'axios';
import React, { Component, PropTypes, DOM, Children } from 'react';
import { render, findDOMNode }                        from 'react-dom';
import { dissoc, memoize, groupBy }                   from 'ramda';

/**
 * @constant includeMap
 * @type {Object}
 */
const includeMap = [
    { extensions: ['js'],  tag: 'script', attrs: { type: 'text/javascript' } },
    { extensions: ['css'], tag: 'style',  attrs: { type: 'text/css' } }
];

/**
 * @constant defaultContextTypes
 * @type {Object}
 */
const defaultContextTypes = {
    router: PropTypes.object
};

/**
 * @method throwError
 * @param {String} message
 * @throws {Error}
 * @return {void}
 */
const throwError = message => {
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
 * @method withContext
 * @param {Object} contextTypes
 * @return {ShadowDOM}
 */
export const withContext = contextTypes => {

    /**
     * @method createContextProvider
     * @param {Object} context
     * @return {ContextProvider}
     */
    const createContextProvider = context => {

        /**
         * @class ContextProvider
         * @extends {Component}
         */
        class ContextProvider extends Component {

            /**
             * @constant propTypes
             * @type {Object}
             */
            static propTypes = {
                children: PropTypes.node.isRequired
            };

            /**
             * @constant childContextTypes
             * @type {Object}
             */
            static childContextTypes = contextTypes;

            /**
             * @method shouldComponentUpdate
             * @return {Boolean}
             */
            shouldComponentUpdate() {
                return true;
            }

            /**
             * @method getChildContext
             * @return {Object}
             */
            getChildContext() {
                return context;
            }

            /**
             * @method render
             * @return {XML}
             */
            render() {
                return this.props.children;
            }

        }

        return ContextProvider;

    };

    /**
     * @class ShadowDOM
     * @extends Component
     */
    return class ShadowDOM extends Component {

        /**
         * @constant contextTypes
         * @type {Object}
         */
        static contextTypes = contextTypes;

        /**
         * @constant propTypes
         * @type {Object}
         */
        static propTypes = {
            children:       PropTypes.node.isRequired,
            include:        PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
            nodeName:       PropTypes.string,
            boundaryMode:   PropTypes.oneOf(['open', 'closed']),
            delegatesFocus: PropTypes.bool
        };

        /**
         * @constant defaultProps
         * @type {Object}
         */
        static defaultProps = {
            include:        [],
            nodeName:       'span',
            boundaryMode:   'open',
            delegatesFocus: false
        };

        /**
         * @constant state
         * @type {Object}
         */
        state = { resolving: false };

        /**
         * @constant ContextProvider
         * @type {ContextProvider}
         */
        ContextProvider = createContextProvider(this.context);

        /**
         * @method componentDidMount
         * @return {void}
         */
        componentDidMount() {

            const { boundaryMode: mode, delegatesFocus } = this.props;

            // Create the shadow root and take the CSS documents from props.
            const node      = findDOMNode(this);
            const root      = node.attachShadow ? node.attachShadow({ mode, delegatesFocus }) : node.createShadowRoot();
            const include   = [].concat(this.props.include);
            const container = this.wrapContainer();

            // Render the passed in component to the shadow root, and then `setState` if there
            // are no CSS documents to be resolved.
            render(container, root);

            include.length === 0 ? this.setState({ root }) : do {

                // Otherwise we'll fetch and attach the passed in stylesheets which need to be
                // resolved before `state.resolved` becomes `true` again.
                this.setState({ root, resolving: true });
                this.attachIncludes(include);

            };

        }

        /**
         * @method wrapContainer
         * @return {Object}
         */
        wrapContainer() {

            // Wrap children in a container if it's an array of children, otherwise simply render the single child
            // which is a valid `ReactElement` instance.
            const { children }    = this.props.children.props;
            const child           = children.length ? <this.props.nodeName>{children}</this.props.nodeName> : children;
            const ContextProvider = this.ContextProvider;

            /**
             * @method getChildContext
             * @return {Object}
             */
            ContextProvider.prototype.getChildContext = () => this.context;

            return <ContextProvider>{child}</ContextProvider>;

        }

        /**
         * @method componentDidUpdate
         * @return {void}
         */
        componentDidUpdate() {

            // Updates consist of simply rendering the container element into the shadow root
            // again, as the `this.wrapContainer()` element contains the passed in component's
            // children.
            render(this.wrapContainer(), this.state.root);

        }

        /**
         * @method attachIncludes
         * @param include {Array}
         * @return {void}
         */
        attachIncludes(include) {

            // Group all of the includes by their extension.
            const groupedFiles = groupBy(file => file.extension)(include.map(path => ({ path, extension: path.split('.').pop() })));
            const includeFiles = Object.keys(groupedFiles).map(extension => {

                const nodeData = includeMap.find(model => model.extensions.includes(extension));
                const files    = groupedFiles[extension].map(model => model.path);

                !nodeData && throwError(`Files with extension of "${extension}" are unsupported`);

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
         * @method throwInvariants
         * @return {Boolean|void}
         */
        throwInvariants() {

            // Ensure that the passed child isn't an array of children.
            Array.isArray(this.props.children) && throwError('You must pass a single child rather than multiple children');

            if (typeof this.props.children.type !== 'string') {

                // Ensure that the passed child has a valid node name.
                throwError('Passed child must be a concrete HTML element rather than another React component');

            }

            return true;

        }

        /**
         * @method render
         * @return {XML}
         */
        render() {

            return this.throwInvariants() && do {

                // Props from the passed component, minus `children` as that's handled by `componentDidMount`.
                const child      = Children.only(this.props.children);
                const childProps = dissoc('children', child.props);
                const className  = this.state.resolving ? 'resolving' : 'resolved';

                // See: https://github.com/facebook/react/issues/4933
                const classNames  = `${childProps.className ? childProps.className : ''} ${className}`.trim();
                const isSupported = child.type in DOM;
                const classProp   = isSupported ? 'className' : 'class';
                const props       = { ...dissoc('className', childProps), [classProp]: classNames };

                <child.type {...props} />;

            };

        }

    };

};

export default withContext(defaultContextTypes);
