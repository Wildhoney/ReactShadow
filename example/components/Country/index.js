import React from 'react';
import PropTypes from 'prop-types';
// import * as duck from '../../duck';
import * as utils from '../../utils';
import Countries from '../Countries';
import Image from './components/Image';

export default function Country({ name, countries, weather }) {
    const { title, label, fahrenheit, timezone, date } = utils.formatWeather(
        name,
        weather,
    );

    return (
        <span>
            {/* <button
                    className="refresh"
                    onClick={() => fetch(country, { cache: false })}
                >
                    Refresh
                </button> */}
            <main>
                <Image src={utils.getFilename(name)} alt={name} />
                <h1>
                    {title} at{' '}
                    {timezone
                        ? date.add(timezone, 'seconds').format('HH:mm:ss')
                        : String.fromCharCode(8212)}
                </h1>
                <h2 title={fahrenheit}>{label}</h2>
                <Countries name={name} countries={countries} />
            </main>
        </span>
    );
}

Country.propTypes = {
    weather: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    countries: PropTypes.array.isRequired,
};
