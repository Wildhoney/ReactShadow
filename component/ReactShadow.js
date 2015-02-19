(function main($window, $document) {

    "use strict";

    /**
     * @constant REACT_ID_ATTRIBUTE
     * @type {String}
     */
    var REACT_ID_ATTRIBUTE = 'data-reactid';

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
    $window.ReactShadow = {

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

            var shadowRoot  = this._shadowRoot = this.getDOMNode().parentNode.createShadowRoot(),
                mainElement = $document.createElement(REACT_SHADOW_ROOT);

            // Append the template node's content to our component.
            this._attachCSSDocuments(shadowRoot);
            shadowRoot.appendChild(mainElement);

            // Render component and intercept the DOM events.
            shadowRoot.appendChild(mainElement);
            React.render(this.render(), mainElement);
            this._interceptEvents();

        },

        /**
         * @method componentDidUpdate
         * @return {void}
         */
        componentDidUpdate: function componentDidUpdate() {
            var containerElement = this._shadowRoot.querySelector(REACT_SHADOW_ROOT);
            React.render(this.render(), containerElement);
        },

        /**
         * @method _interceptEvents
         * @return {void}
         * @private
         */
        _interceptEvents: function _interceptEvents() {

            // Memorise the React ID's root ID for intercepting events.
            var rootReactId = this.getDOMNode().getAttribute(REACT_ID_ATTRIBUTE),
                domNode     = this.getDOMNode().parentNode;

            /**
             * @method redirectEvent
             * @param event {Object}
             * @return {Function}
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
         * @method _attachCSSDocuments
         * @param element {HTMLElement}
         * @return {HTMLElement}
         * @private
         */
        _attachCSSDocuments: function _attachCSSDocuments(element) {

            if (this.cssDocuments) {

                var isFunction   = typeof this.cssDocuments === 'function',
                    cssDocuments = isFunction ? this.cssDocuments() : this.cssDocuments;

                cssDocuments.forEach(function forEach(cssDocument) {

                    // Construct the HTML for the external stylesheets.
                    var styleElement = $document.createElement('style');
                    styleElement.innerHTML = '@import "' + cssDocument + '"';
                    element.appendChild(styleElement);

                });

            }

            return element;

        }

    };

})(window, window.document);