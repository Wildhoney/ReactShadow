(function main($react) {

    /**
     * @class ReactShadow
     * @author Adam Timberlake
     * @link https://github.com/Wildhoney/ReactShadow
     */
    var AppExample = $react.createClass({

        /**
         * @property mixins
         * @type {Array}
         */
        mixins: [ReactShadow],

        /**
         * @property cssDocuments
         * @type {Array}
         */
        cssDocuments: ['../css/Default.css'],

        /**
         * @method render
         * @return {XML}
         */
        render: function render() {
            return <div><h1 className="title">ReactShadow Example</h1></div>
        }

    });

    // Mount the node into the DOM!
    var mountNode = document.querySelector('*[data-react-shadow]');
    $react.render(<AppExample></AppExample>, mountNode);

})(window.React);