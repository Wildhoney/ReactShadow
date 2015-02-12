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
         * @method getInitialState
         * @return {{refreshed: number}}
         */
        getInitialState: function getInitialState() {
            return { refreshed: 0 };
        },

        /**
         * @method componentDidMount
         * @return {void}
         */
        componentDidMount: function componentDidMount() {

            setTimeout(function() {
                this.setState({ refreshed: this.state.refreshed + 1 });
            }.bind(this), 1000);

        },

        /**
         * @method render
         * @return {XML}
         */
        render: function render() {
            return <div><h1 className="title">ReactShadow Example: {this.state.refreshed}</h1></div>
        }

    });

    // Mount the node into the DOM!
    var mountNode = document.querySelector('*[data-react-shadow]');
    $react.render(<AppExample></AppExample>, mountNode);

})(window.React);