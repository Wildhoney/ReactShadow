import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import ready from 'document-ready-promise';
import ShadowDOM from '../../src/react-shadow';

/**
 * @class ReactShadow
 * @author Adam Timberlake
 * @link https://github.com/Wildhoney/ReactShadow
 */
export class Counter extends Component {

    /**
     * @constant propTypes
     * @type {Object}
     */
    static propTypes = {
        name: PropTypes.string.isRequired
    };

    /**
     * @method constructor
     * @return {Object}
     */
    constructor() {
        super();
        this.state = { refreshed: 0, value: '' };
    }

    /**
     * @method componentDidMount
     * @return {void}
     */
    componentDidMount() {
        this.startInterval();
    }

    /**
     * @method startInterval
     * @return {void}
     */
    startInterval() {
        const interval = setInterval(() => this.setState({ refreshed: this.state.refreshed + 1 }), 1000);
        this.setState({ interval: interval });
    }

    /**
     * @method resetCounter
     * @return {void}
     */
    resetCounter() {
        clearInterval(this.state.interval);
        this.setState({ refreshed: 0, value: this.state.value });
        this.startInterval();
    }

    /**
     * @method render
     * @return {XML}
     */
    render() {

        return (
            <ShadowDOM cssDocuments={['css/core.css', `css/component/${this.props.name}.css`]}>
                <section onClick={this.resetCounter.bind(this)} title="Reset Counter">
                    <h1 className="title">
                        {this.state.refreshed}
                    </h1>
                </section>
            </ShadowDOM>
        );

    }

}

ready().then(() => {

    ['first', 'second', 'third'].forEach(name => {
        const node = document.querySelector(`*[data-react-shadow="${name}"]`) || document.body;
        render(<Counter name={name} />, node);
    });

});
