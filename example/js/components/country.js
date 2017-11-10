import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { memoize } from 'ramda';
import capitalise from 'capitalize';
import DocumentTitle from 'react-document-title';
import Countries from './countries';
import { fetchData } from '../actions';
import { fromSlug, filenameFor } from '../containers/layout';

/**
 * @method dispatchOnce
 * @param {String} country
 * @param {Function} dispatch
 * @return {void}
 */
const dispatchOnce = memoize((country, dispatch) => {
    dispatch(fetchData(country));
});

export default class extends Component {

    /**
     * @constant propTypes
     * @type {Object}
     */
    static propTypes = {
        country: PropTypes.string.isRequired
    };

    /**
     * @method componentDidMount
     * @return {void}
     */
    componentDidMount() {
        dispatchOnce(this.props.country, this.props.dispatch);
    }

    /**
     * @method componentWillReceiveProps
     * @param {Object} nextProps
     * @return {void}
     */
    componentWillReceiveProps(nextProps) {
        dispatchOnce(nextProps.country, this.props.dispatch);
    }

    /**
     * @method find
     * @param {String} country
     * @return {Object}
     */
    find(country) {

        const weather = this.props.weather[country];
        const description = () => capitalise.words(weather.weather[0].description);

        return {
            country: fromSlug(country),
            title: weather ? `${description()} in ${fromSlug(country)}` : `Weather in ${country}`,
            label: weather ? `${weather.main.temp}${String.fromCharCode(8451)}` : String.fromCharCode(8212),
            fahrenheit: weather ? `${weather.main.temp * 9 / 5 + 32}${String.fromCharCode(8457)}` : ''
        };

    }

    /**
     * @method render
     * @return {XML}
     */
    render() {

        const { country, title, label, fahrenheit } = this.find(this.props.country);

        return (
            <DocumentTitle title={`Weather for ${country}`}>
                <main>
                    <img src={filenameFor(country)} alt={country} />
                    <h1>{title}</h1>
                    <h2 title={fahrenheit}>{label}</h2>
                    <Countries list={this.props.countries} />
                </main>
            </DocumentTitle>
        );

    }

}
