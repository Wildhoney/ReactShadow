import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getCountries } from './utils';

export default function Countries({ name, countries }) {
    const router = useRouter();

    const handleChange = useCallback(
        (event) => {
            router.push('/[name]', `/${event.target.value}`);
        },
        [countries],
    );

    return (
        <>
            <h3>Weather for:</h3>

            <ul>
                {getCountries(countries).map((model) => (
                    <li key={`li_${model.name}`}>
                        <Link href="/[name]" as={model.href}>
                            <a className={model.name === name ? 'active' : ''}>
                                {model.name}
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>

            <select value={name} onChange={handleChange}>
                {getCountries(countries).map(({ name, slug }) => (
                    <option key={`option_${name}`} value={slug}>
                        {name}
                    </option>
                ))}
            </select>
        </>
    );
}

Countries.propTypes = {
    name: PropTypes.string.isRequired,
    countries: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
