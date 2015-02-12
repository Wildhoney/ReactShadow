(function main($react) {

    /**
     * @class ReactShadow
     * @author Adam Timberlake
     * @link https://github.com/Wildhoney/ReactShadow
     */
    var ReactShadow = $react.createClass({

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
        render: function() {
            return <div><section className="ok">Okay</section></div>
        }

    });

    // Mount the node into the DOM!
    var mountNode = document.querySelector('*[data-react-shadow]');
    $react.render(<ReactShadow></ReactShadow>, mountNode);

})(window.React);