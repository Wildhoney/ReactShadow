import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import ready from 'document-ready-promise';
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
        this.state = { country: 'London', weather: null };
    }

    /**
     * @method componentWillMount
     * @return {void}
     */
    componentWillMount() {
        this.weatherFor(this.state.country);
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
        const label = weather ? `${weather.main.temp}${String.fromCharCode(8451)}` : String.fromCharCode(8212);

        return (
            <ShadowDOM cssDocuments="css/country.css">

                <div>

                    <img src={`/images/${country.replace(/ /ig, '-').toLowerCase()}.png`} alt={country} />

                    <h1>Weather in {country}</h1>

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
