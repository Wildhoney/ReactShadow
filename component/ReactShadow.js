(function main($window, $document) {

    /**
     * @module ReactShadow
     * @author Adam Timberlake
     * @link https://github.com/Wildhoney/ReactShadow
     */
    $window.ReactShadow = {

        /**
         * @property shadowRoot
         * @type {Object}
         */
        shadowRoot: {},

        /**
         * @method componentDidMount
         * @return {void}
         */
        componentDidMount: function componentDidMount() {

            var shadowRoot      = this.shadowRoot = this.getDOMNode().parentNode.createShadowRoot(),
                templateElement = $document.createElement('template'),
                rendered        = this.render();

            // Obtain the HTML from the component's `render` method.
            templateElement.content.appendChild(this.getDOMNode().cloneNode(true));
            this.attachCSSDocuments(templateElement);

            // Append the template node's content to our component.
            var clone = $document.importNode(templateElement.content, true);
            shadowRoot.appendChild(clone);
            this.interceptEvents();

        },

        /**
         * @method interceptEvents
         * @return {void}
         */
        interceptEvents: function interceptEvents() {

            this.shadowRoot.addEventListener('click', function onClick(event) {

                event.stopPropagation();
                event.preventDefault();

                var targetId = event.target.getAttribute('data-reactid'),
                    element  = $document.querySelector('*[data-reactid="' + targetId + '"]');

                element.click();

            }.bind(this));

        },

        /**
         * @method componentDidUpdate
         * @return {void}
         */
        componentDidUpdate: function componentDidUpdate() {

            var containerElement = this.shadowRoot.querySelector(':not(style)');
            containerElement.innerHTML = '';

            var domNode    = this.getDOMNode(),
                children   = domNode.children,
                childCount = children.length;

            for (var index = 0; index < childCount; index++) {
                containerElement.appendChild(domNode.children[index].cloneNode(true));
            }

        },

        /**
         * @method attachCSSDocuments
         * @param element {HTMLElement}
         * @return {HTMLElement}
         */
        attachCSSDocuments: function attachCSSDocuments(element) {

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

        },

        /**
         * @method cleanElements
         * @return {void}
         */
        cleanElements: function cleanElements() {

            var children = this.getDOMNode().children,
                count    = children.length;

            while (count--) {
                children[count].remove();
            }

        }

    };

})(window, window.document);