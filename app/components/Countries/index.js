import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import * as utils from '../../utils';
import Header from '../Header';
import { getCities } from './utils';

export default function Cities({ name, cities }) {
    const router = useRouter();

    const handleChange = useCallback(
        (event) => {
            router.push('/[name]', `/${event.target.value}`);
        },
        [cities]
    );

    return (
        <>
            <Header>Weather for:</Header>

            <ul>
                {getCities(cities).map((model) => (
                    <li key={`li_${model.name}`}>
                        <Link href="/[name]" as={model.href}>
                            <a className={model.name === name ? 'active' : ''}>{model.name}</a>
                        </Link>
                    </li>
                ))}
            </ul>

            <select value={utils.toSlug(name)} onChange={handleChange}>
                {getCities(cities).map(({ name, slug }) => (
                    <option key={`option_${name}`} value={slug}>
                        {name}
                    </option>
                ))}
            </select>
        </>
    );
}

Cities.propTypes = {
    name: PropTypes.string.isRequired,
    cities: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
