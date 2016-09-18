import React, { Component, PropTypes } from 'react';
import ShadowDOM from '../../src/react-shadow';
import nlp from 'nlp_compromise';
import capitalise from 'capitalize';
import memoize from 'ramda/src/memoize';

/**
 * @constant API_KEY
 * @type {String}
 */
const API_KEY = '07b72c930f0d226f7c6866cc753a678c';

/**
 * @method fetchWeather
 * @param {String} url
 * @return {Promise}
 */
const fetchWeather = memoize(url => fetch(url).then(response => response.json()));

/**
 * @method filenameFor
 * @param {String} name
 * @return {String}
 */
const filenameFor = memoize(name => `/images/${name.replace(/ /ig, '-').toLowerCase()}.png`);

/**
 * @author Adam Timberlake
 * @link https://github.com/Wildhoney/ReactShadow
 */
export default class extends Component {

    /**
     * @constant defaultProps
     * @type {Object}
     */
    static defaultProps = {
        countries: ['Amsterdam', 'Cairo', 'London', 'Moscow', 'Paris', 'Rio de Janeiro',
                    'Rome', 'Sydney', 'Mumbai', 'New York']
    };

    /**
     * @method componentWillMount
     * @return {void}
     */
    componentWillMount() {

        const countries = this.props.countries;
        const country = countries[Math.floor(Math.random() * countries.length)];

        this.state = { country, weather: null };
        this.weatherFor(country);

    }

    /**
     * @method weatherFor
     * @param {String} country
     * @return {void}
     */
    weatherFor(country) {

        this.setState({ country, weather: null });

        const url = `http://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${API_KEY}&units=metric`;
        fetchWeather(url).then(weather => this.setState({ weather }));

    }

    /**
     * @method render
     * @return {XML}
     */
    render() {

        const { weather, country } = this.state;
        const description = () => capitalise.words(nlp.noun(weather.weather[0].description).pluralize());

        const title = weather ? `${description()} in ${country}` : `Weather in ${country}`;
        const label = weather ? `${weather.main.temp}${String.fromCharCode(8451)}` : String.fromCharCode(8212);
        const fheit = weather ? `${weather.main.temp * 9 / 5 + 32}${String.fromCharCode(8457)}` : '';

        return (
            <ShadowDOM include={['css/country.css', 'css/default.css']}>

                <div className="weather">

                    <img src={filenameFor(country)} alt={country} />

                    <h1>{title}</h1>
                    <h2 title={fheit}>{label}</h2>

                    <ul>

                        <li className="title">Weather for:</li>

                        {this.props.countries.map(name => {

                            const className = name === country ? 'active' : '';

                            return (
                                <li key={name}>
                                    <a onClick={() => this.weatherFor(name)} className={className}>
                                        {name}
                                    </a>
                                </li>
                            );

                        })}

                    </ul>

                </div>

            </ShadowDOM>
        );

    }

}
