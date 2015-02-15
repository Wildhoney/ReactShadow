(function main($window, $document, $react) {

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

            var shadowRoot      = this._shadowRoot = this.getDOMNode().parentNode.createShadowRoot(),
                templateElement = $document.createElement('template'),
                mainElement     = $document.createElement('main');

            // Append the template node's content to our component.
            this._attachCSSDocuments(templateElement);
            var clone = $document.importNode(templateElement.content, true);
            shadowRoot.appendChild(clone);

            shadowRoot.appendChild(mainElement);
            $react.render(this.render(), mainElement);

            this._interceptEvents();

        },

        /**
         * @method componentDidUpdate
         * @return {void}
         */
        componentDidUpdate: function componentDidUpdate() {
            var containerElement = this._shadowRoot.querySelector('main');
            $react.render(this.render(), containerElement);
        },

        /**
         * @method _interceptEvents
         * @return {void}
         */
        _interceptEvents: function _interceptEvents() {

            // Memorise the React ID's root ID for intercepting events.
            var rootReactId = this.getDOMNode().getAttribute('data-reactid');

            /**
             * @method redirectEvent
             * @param event {Object}
             * @return {Function}
             */
            var redirectEvent = function redirectEvent(event) {

                event.stopPropagation();

                var targetId = event.target.getAttribute('data-reactid');

                if (targetId) {

                    // Translate current target ID into the React.js element we're shadowing.
                    var translatedId = targetId.replace(/\.[0-9]+/, rootReactId),
                        element      = $document.querySelector('*[data-reactid="' + translatedId + '"]');

                    // Dispatch the event on the original component's element.
                    var customEvent = $document.createEvent('Events');
                    customEvent.initEvent(event.type, true, false);
                    element.dispatchEvent(customEvent);

                }

            }.bind(this);

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

})(window, window.document, window.React);