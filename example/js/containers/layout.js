import React, { Component, PropTypes } from 'react';
import nlp                             from 'nlp_compromise';
import capitalise                      from 'capitalize';
import { memoize }                     from 'ramda';
import { BrowserRouter, Route }        from 'react-router-dom'
import ShadowDOM                       from '../../../src/react-shadow';
import Countries                       from '../components/Countries';
import Country                         from '../components/Country';
import { connect }                     from 'react-redux';

/**
 * @constant API_KEY
 * @type {String}
 */
const API_KEY = '07b72c930f0d226f7c6866cc753a678c';

// /**
//  * @method fetchWeather
//  * @param {String} url
//  * @return {Promise}
//  */
// const fetchWeather = memoize(url => fetch(url).then(response => response.json()));
//
// /**
//  * @method filenameFor
//  * @param {String} name
//  * @return {String}
//  */
// const filenameFor = memoize(name => `/images/${name.replace(/ /ig, '-').toLowerCase()}.png`);

/**
 * @method toSlug
 * @param {String} x
 * @return {String}
 */
export const toSlug = x => x.replace(/ /g, '-').toLowerCase();

/**
 * @method fromSlug
 * @param {String} x
 * @return {String}
 */
export const fromSlug = x => x.replace(/-/g, ' ');

/**
 * @method handleState
 * @param {Object} state
 * @return {Object}
 */
const handleState = state => {
    return { countries: state.countries };
};

/**
 * @param {Object} props
 * @return {XML}
 */
export default connect(handleState)(props => {

    return (
        <BrowserRouter>
            <ShadowDOM include={['css/country.css', 'css/default.css']}>

                <section className="weather">
                    <Route path="/:country.html" component={Country} />
                    <Countries list={props.countries} />
                </section>

            </ShadowDOM>
        </BrowserRouter>
    );

});

// export default class extends Component {
//
//     /**
//      * @method weatherFor
//      * @param {String} country
//      * @return {void}
//      */
//     weatherFor(country) {
//
//         this.setState({ country, weather: null });
//
//         const url = `http://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${API_KEY}&units=metric`;
//         fetchWeather(url).then(weather => this.setState({ weather }));
//
//     }
//
//     /**
//      * @method render
//      * @return {XML}
//      */
//     render() {
//
//         const { weather, country } = this.state;
//         const description = () => capitalise.words(nlp.noun(weather.weather[0].description).pluralize());
//
//         const title = weather ? `${description()} in ${country}` : `Weather in ${country}`;
//         const label = weather ? `${weather.main.temp}${String.fromCharCode(8451)}` : String.fromCharCode(8212);
//         const fheit = weather ? `${weather.main.temp * 9 / 5 + 32}${String.fromCharCode(8457)}` : '';
//

//
//     }
//
// }
