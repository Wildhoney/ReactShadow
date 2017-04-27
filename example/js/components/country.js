import React, { PureComponent, PropTypes } from 'react';
import nlp                                 from 'nlp_compromise';
import { memoize }                         from 'ramda';
import capitalise                          from 'capitalize';
import Countries                           from './countries';
import { fetchData }                       from '../actions';
import { fromSlug, filenameFor }           from '../containers/layout';

/**
 * @method dispatchOnce
 * @param {String} country
 * @param {Function} dispatch
 * @return {void}
 */
const dispatchOnce = memoize((country, dispatch) => {
    dispatch(fetchData(country));
});

export default class extends PureComponent {

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
     * @method shouldComponentUpdate
     * @param {Object} nextProps
     * @return {Boolean}
     */
    shouldComponentUpdate(nextProps) {

        const weatherEqual = this.props.weather === nextProps.weather;
        const countryEqual = this.props.country === nextProps.country;

        return !weatherEqual || !countryEqual;

    }

    /**
     * @method find
     * @param {String} country
     * @return {Object}
     */
    find(country) {

        const weather     = this.props.weather[country];
        const description = () => capitalise.words(nlp.noun(weather.weather[0].description).pluralize());

        return {
            country:    fromSlug(country),
            title:      weather ? `${description()} in ${fromSlug(country)}` : `Weather in ${country}`,
            label:      weather ? `${weather.main.temp}${String.fromCharCode(8451)}` : String.fromCharCode(8212),
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
            <main>
                <img src={filenameFor(country)} alt={country} />
                <h1>{title}</h1>
                <h2 title={fahrenheit}>{label}</h2>
                <Countries list={this.props.countries} />
            </main>
        );

    }

}
