(function main($react) {

    var ReactShadow = $react.createClass({

        componentDidMount: function() {

            var shadow = this.getDOMNode().createShadowRoot();
            var html = $react.renderToString(this.render());

            var template = document.createElement('template');
            template.innerHTML = '<style> @import "../css/Default.css"; </style>' + html;

            var clone = document.importNode(template.content, true);
            shadow.appendChild(clone);

            //root.innerHTML = html;

        },

        render: function() {
            return <div><section className="ok">Okay</section></div>
        }

    });

    // Mount the node into the DOM!
    var mountNode = document.querySelector('*[data-react-shadow]');
    $react.render(<ReactShadow></ReactShadow>, mountNode);

})(window.React);