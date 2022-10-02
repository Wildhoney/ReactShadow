import React, { ReactElement, useCallback } from 'react';
import PropTypes from 'prop-types';
// import { useRouter } from 'next/router';
// import Link from 'next/link';
import * as utils from '../../utils';
import Header from '../Header';
// import { getPlaces } from './utils';
import { Props } from './types';
import { useRoutes } from 'react-router';

export default function Cities({ name, cities }: Props): ReactElement {
    useRoutes;

    const handleChange = useCallback(
        (event) => {
            // router.push('/[name]', `/${event.target.value}`);
        },
        [cities]
    );

    return (
        <>
            {/* <Header>Weather for:</Header> */}

            <ul>
                {cities.map((city) => (
                    <li key={city}>
                        <a href={`/${city}`}>{city}</a>
                    </li>
                ))}
            </ul>

            {/* <select value={utils.toSlug(name)} onChange={handleChange}>
                {(cities).map(city => (
                    <option key={`option_${name}`} value={city}>
                        {city}
                    </option>
                ))}
            </select> */}
        </>
    );
}
