import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import * as utils from '../../utils';

function Countries({ country, countries, history }) {
    const collection = countries
        .sort((a, b) => a.localeCompare(b))
        .map(name => ({
            name,
            href: `/${utils.toSlug(name)}.html`,
        }));

    const handleChange = useCallback(
        ({ target }) => {
            const { href } = collection.find(
                ({ name }) => name === target.value,
            );
            history.push(href);
        },
        [countries],
    );

    return (
        <>
            <h3>Weather for:</h3>

            <ul>
                {collection.map(({ name, href }) => (
                    <li key={`li_${name}`}>
                        <NavLink to={href} activeClassName="active">
                            {name}
                        </NavLink>
                    </li>
                ))}
            </ul>

            <select value={country} onChange={handleChange}>
                {collection.map(({ name }) => (
                    <option key={`option_${name}`} value={name}>
                        {name}
                    </option>
                ))}
            </select>
        </>
    );
}

Countries.propTypes = {
    country: PropTypes.string.isRequired,
    countries: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

export default withRouter(Countries);
