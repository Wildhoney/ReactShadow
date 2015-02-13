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
        //cssDocuments: ['../css/Default.css'],

        /**
         * @method cssDocuments
         * @return {*[]}
         */
        cssDocuments: function cssDocuments() {
            return ['../css/Component.css', '../css/' + this.props.cssDocument];
        },

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
            this.startInterval();
        },

        /**
         * @method startInterval
         * @return {void}
         */
        startInterval: function startInterval() {

            var interval = setInterval(function() {
                this.setState({ refreshed: this.state.refreshed + 1 });
            }.bind(this), 1000);

            this.setState({ interval: interval });

        },

        /**
         * @method reset
         * @return {void}
         */
        reset: function reset() {
            clearInterval(this.state.interval);
            this.setState({ refreshed: 0 });
            this.startInterval();
        },

        /**
         * @method render
         * @return {XML}
         */
        render: function render() {
            return <section>
                       <h1 className="title">ReactShadow Example: {this.state.refreshed}</h1>
                       <a title="Reset Counter" className="reset" onClick={this.reset}>Reset Counter</a>
                   </section>
        }

    });

    // Mount the node into the DOM!
    var firstMountNode  = document.querySelector('*[data-react-shadow="first"]'),
        secondMountNode = document.querySelector('*[data-react-shadow="second"]'),
        thirdMountNode  = document.querySelector('*[data-react-shadow="third"]');

    $react.render(<AppExample cssDocument="component/First.css"></AppExample>, firstMountNode);
    //$react.render(<AppExample cssDocument="component/Second.css"></AppExample>, secondMountNode);
    //$react.render(<AppExample cssDocument="component/Third.css"></AppExample>, thirdMountNode);

})(window.React);