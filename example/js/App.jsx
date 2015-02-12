(function main($react) {

    var Test = $react.createClass({

        componentDidMount: function() {

            var shadow = this.getDOMNode().createShadowRoot();
            var html = $react.renderToString(this.render());

            var template = document.createElement('template');
            template.innerHTML = '<style> @import "css/default.css"; </style>' + html;

            var clone = document.importNode(template.content, true);
            shadow.appendChild(clone);

            //root.innerHTML = html;

        },

        render: function() {
            return <div><section className="ok">Okay</section></div>
        }

    });

    $react.render(<Test></Test>, document.querySelector('.app-root'));

})(window.React);