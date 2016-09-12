import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import ready from 'document-ready-promise';
import nlp from 'nlp_compromise';
import capitalise from 'capitalize';
import ShadowDOM from '../../src/react-shadow';

/**
 * @constant API_KEY
 * @type {String}
 */
const API_KEY = '07b72c930f0d226f7c6866cc753a678c';

/**
 * @class Weather
 * @author Adam Timberlake
 * @link https://github.com/Wildhoney/ReactShadow
 */
export class Weather extends Component {

    /**
     * @constant defaultProps
     * @type {Object}
     */
    static defaultProps = { countries: ['Amsterdam', 'Cairo', 'London', 'Moscow', 'Paris', 'Rio de Janeiro', 'Rome', 'Sydney'] };

    /**
     * @method constructor
     * @return {Object}
     */
    constructor() {
        super();
        const countries = Weather.defaultProps.countries;
    }

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
        fetch(url).then(response => response.json()).then(weather => this.setState({ weather }));

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

        return (
            <ShadowDOM cssDocuments="css/country.css">

                <div>

                    <img src={`/images/${country.replace(/ /ig, '-').toLowerCase()}.png`} alt={country} />

                    <h1>{title}</h1>

                    <h2 className={weather ? 'loading' : ''}>
                        {label}
                    </h2>

                    <ul>

                        <li className="title">Weather for:</li>

                        {this.props.countries.map(name => {

                            return (
                                <li key={name}>
                                    <a
                                       onClick={() => this.weatherFor(name)}
                                       className={name === country ? 'active' : ''}
                                        >
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

ready().then(() => render(<Weather />, document.querySelector('section.container')));
