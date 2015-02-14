(function main($window, $document) {

    "use strict";

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

            // Prevent the constant invocation of `getDOMNode()`.
            var componentElement = this.getDOMNode();

            // Wrap the current DOM node in a script element.
            var scriptElement = $document.createElement('script');
            componentElement.parentNode.appendChild(scriptElement);
            scriptElement.appendChild(componentElement);

            // Create shadow root for the visible component.
            var shadowRoot      = this._shadowRoot = componentElement.parentNode.parentNode.createShadowRoot(),
                templateElement = $document.createElement('template');

            // Obtain the HTML from the component's rendered elements.
            templateElement.content.appendChild(componentElement.cloneNode(true));
            this._attachCSSDocuments(templateElement);

            // Append the template node's content to our component.
            var clone = $document.importNode(templateElement.content, true);
            shadowRoot.appendChild(clone);
            this._interceptEvents();

        },

        /**
         * @method componentDidUpdate
         * @return {void}
         */
        componentDidUpdate: function componentDidUpdate() {

            var containerElement = this._shadowRoot.querySelector(':not(style)');
            containerElement.innerHTML = '';

            var domNode    = this.getDOMNode(),
                children   = domNode.children,
                childCount = children.length;

            for (var index = 0; index < childCount; index++) {
                containerElement.appendChild(domNode.children[index].cloneNode(true));
            }

        },

        /**
         * @method _interceptEvents
         * @return {void}
         */
        _interceptEvents: function _interceptEvents() {

            /**
             * @method redirectEvent
             * @param event {Object}
             * @return {Function}
             */
            var redirectEvent = function redirectEvent(event) {

                event.stopPropagation();
                event.preventDefault();

                var targetId = event.target.getAttribute('data-reactid'),
                    element = $document.querySelector('*[data-reactid="' + targetId + '"]');

                var customEvent = $document.createEvent('Events');
                customEvent.initEvent(event.type, true, false );
                element.dispatchEvent(customEvent);

            };

            // List of all events that should be intercepted and re-routed.
            var eventsList = ['click', 'dblclick', 'mouseup', 'mouseout', 'mouseover', 'mousedown', 'mouseenter',
                'mouseleave', 'contextmenu'];

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
                    element.content.appendChild(styleElement);

                });

            }

            return element;

        }

    };

})(window, window.document);