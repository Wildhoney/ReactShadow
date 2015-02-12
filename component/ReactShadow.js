(function main($window, $document, $react) {

    /**
     * @module ReactShadow
     * @author Adam Timberlake
     * @link https://github.com/Wildhoney/ReactShadow
     */
    $window.ReactShadow = {

        /**
         * @method componentDidMount
         * @return {void}
         */
        componentDidMount: function componentDidMount() {

            var shadowRoot      = this.getDOMNode().createShadowRoot(),
                templateElement = $document.createElement('template');

            if (this.cssDocuments) {

                this.cssDocuments.forEach(function forEach(cssDocument) {

                    // Construct the HTML for the external stylesheets.
                    var styleElement = $document.createElement('style');
                    styleElement.innerHTML = '@import "' + cssDocument + '"';
                    templateElement.content.appendChild(styleElement);

                });

            }

            // Obtain the HTML from the component's `render` method.
            templateElement.innerHTML += $react.renderToString(this.render());

            // Append the template node's content to our component.
            var clone = $document.importNode(templateElement.content, true);
            shadowRoot.appendChild(clone);
            this.cleanElements();

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

})(window, window.document, window.React);