import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import * as utils from '../../utils';
import Countries from '../Countries';
import Image from './components/Image';

export default function City({ name, cities, weather }) {
    const { title, label, fahrenheit, timezone, date } = utils.formatWeather(
        name,
        weather,
    );

    return (
        <span>
            <Link href="/[name]" as={`/${utils.toSlug(name)}`}>
                <a className="refresh">Refresh</a>
            </Link>
            <main>
                <Image src={utils.getFilename(name)} alt={name} />
                <h1>
                    {title} at{' '}
                    {timezone
                        ? date.add(timezone, 'seconds').format('HH:mm:ss')
                        : String.fromCharCode(8212)}
                </h1>
                <h2 title={fahrenheit}>{label}</h2>
                <Countries name={utils.fromSlug(name)} cities={cities} />
            </main>
        </span>
    );
}

City.propTypes = {
    weather: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    cities: PropTypes.array.isRequired,
};
