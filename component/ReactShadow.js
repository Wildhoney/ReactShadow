(function main($window) {

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

            var shadow = this.getDOMNode().createShadowRoot();
            var html = $react.renderToString(this.render());

            var template = document.createElement('template');
            template.innerHTML = '<style> @import "../css/Default.css"; </style>' + html;

            var clone = document.importNode(template.content, true);
            shadow.appendChild(clone);

            //root.innerHTML = html;

        },

    };

})(window);