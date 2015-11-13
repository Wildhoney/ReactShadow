(function main($window, $document) {

    "use strict";

    var React;
    var ReactDOM;


    /**
     * @constant REACT_ID_ATTRIBUTE
     * @type {String}
     */

    var REACT_ID_ATTRIBUTE = 'data-reactid';

    if (typeof require === 'function') {
        React = require('react');
        ReactDOM = require('react-dom');
        REACT_ID_ATTRIBUTE = require('react/lib/DOMProperty').ID_ATTRIBUTE_NAME;
    } else {
        React = $window.React;
    }

    /**
     * @constant REACT_SHADOW_ROOT
     * @type {String}
     */
    var REACT_SHADOW_ROOT = 'main';

    /**
     * @module ReactShadow
     * @author Adam Timberlake
     * @link https://github.com/Wildhoney/ReactShadow
     */
    var ReactShadow = {

        /**
         * @property _shadowRoot
         * @type {Object}
         * @private
         */
        _shadowRoot: {},

        /**
         * @method componentDidMount
         * @return {void}
         */
        componentDidMount: function componentDidMount() {

            var shadowRoot  = this._shadowRoot = ReactDOM.findDOMNode(this.parentNode).createShadowRoot(),
                mainElement = $document.createElement(REACT_SHADOW_ROOT);

            // Attach CSS.
            this._attachCSS(shadowRoot);

            // Append the template node's content to our component.
            shadowRoot.appendChild(mainElement);

            // Render component and intercept the DOM events.
            React.render(this.render(), mainElement);
            this._interceptEvents();

            // strip inline <style> elements
            this._stripInlineStyles();

            // Wrap current DOM node in `script` tag.
            var scriptElement = $document.createElement('script');
            ReactDOM.findDOMNode(this).parentNode.appendChild(scriptElement);
            scriptElement.appendChild(ReactDOM.findDOMNode(this));

            // Shadow insertion point for nesting shadow roots.
            //shadowRoot.appendChild($document.createElement('shadow'));

        },

        /**
         * @method componentDidUpdate
         * @return {void}
         */
        componentDidUpdate: function componentDidUpdate() {
            var containerElement = this._shadowRoot.querySelector(REACT_SHADOW_ROOT);
            React.render(this.render(), containerElement);
            this._stripInlineStyles();
        },


       /**
        * @method _stripInlineStyles
        * @return {void}
        * @private
        */
        _stripInlineStyles: function _stripInlineStyles() {
            var src = ReactDOM.findDOMNode(this);
            var s = src.querySelectorAll('style');
            var i = s.length;
            while (i--) { s[i].remove(); }
        },

        /**
         * @method _attachCSS
         * @param {HTMLElement} shadowRoot
         * @return {void}
         * @private
         */
        _attachCSS: function _attachCSS(shadowRoot) {

            if (this.cssDocuments) {
                this._attachCSSDocuments(shadowRoot);
            }

            if (this.cssSource) {
                this._attachCSSSource(shadowRoot);
            }

        },

        /**
         * @method _interceptEvents
         * @return {void}
         * @private
         */
        _interceptEvents: function _interceptEvents() {

            // Memorise the React ID's root ID for intercepting events.
            var rootReactId = ReactDOM.findDOMNode(this).getAttribute(REACT_ID_ATTRIBUTE),
                domNode     = ReactDOM.findDOMNode(this).parentNode;

            /**
             * @method redirectEvent
             * @param event {Object}
             * @return {void}
             */
            var redirectEvent = function redirectEvent(event) {

                event.stopPropagation();

                var targetId = event.target.getAttribute(REACT_ID_ATTRIBUTE);

                if (targetId) {

                    // Translate current target ID into the React.js element we're shadowing.
                    var translatedId = targetId.replace(/\.[0-9]+/, rootReactId),
                        element      = domNode.querySelector('*[' + REACT_ID_ATTRIBUTE + '="' + translatedId + '"]');

                    if (event.target.value) {

                        // Update the original element's value.
                        element.setAttribute('value', event.target.value);

                    }

                    // Dispatch the event on the original component's element.
                    var customEvent = $document.createEvent('Events');
                    customEvent.initEvent(event.type, true, false);
                    element.dispatchEvent(customEvent);

                }

            }.bind(this);

            // List of all events that should be intercepted and re-routed.
            var eventsList = ['click', 'dblclick', 'mouseup', 'mouseout', 'mouseover', 'mousedown', 'mouseenter',
                              'mouseleave', 'contextmenu', 'keyup', 'keydown', 'change'];

            eventsList.forEach(function forEach(eventName) {
                this._shadowRoot.addEventListener(eventName, redirectEvent);
            }.bind(this));

        },

        /**
         * Construct the HTML for the external stylesheets
         *
         * @method createStyle
         * @param {HTMLElement} element
         * @param {String} styleContent Content style for given element.
         * @return {HTMLElement}
         * @private
         */
        _createStyle: function(element, styleContent) {

            var styleElement       = $document.createElement('style');
            styleElement.innerHTML = styleContent;
            element.appendChild(styleElement);
            return element;

        },

        /**
         * @method _attachCSSSource
         * @param  {HTMLElement} element
         * @return {HTMLElement}
         * @private
         */
        _attachCSSSource: function(element) {
            this._createStyle(element, this.cssSource);
        },


        /**
         * @method _attachCSSDocuments
         * @param element {HTMLElement}
         * @return {HTMLElement}
         * @private
         */
        _attachCSSDocuments: function _attachCSSDocuments(element) {
            var that = this;

            if (this.cssDocuments) {

                var isFunction   = typeof this.cssDocuments === 'function',
                    cssDocuments = isFunction ? this.cssDocuments() : this.cssDocuments;

                cssDocuments.forEach(function forEach(cssDocument) {
                    that._createStyle(element, '@import "' + cssDocument + '"');
                });

            }

            return element;

        }

    };


    // Export the module as a CommonJS module if possible
    if (typeof module !== 'undefined' && module != null) {
        module.exports = ReactShadow;
        return;
    }

    $window.ReactShadow = ReactShadow;

})(window, window.document);
