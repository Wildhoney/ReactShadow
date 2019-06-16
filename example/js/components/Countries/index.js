import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import * as utils from '../../utils';

function Countries({ list }) {
    return (
        <ul>
            <li className="title">Weather for:</li>

            {list.map(name => {
                return (
                    <li key={name}>
                        <NavLink
                            to={`/${utils.toSlug(name)}.html`}
                            activeClassName="active"
                        >
                            {name}
                        </NavLink>
                    </li>
                );
            })}
        </ul>
    );
}

Countries.propTypes = {
    list: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default withRouter(Countries);
