import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { toSlug } from '../containers/layout';

export default withRouter(class extends PureComponent {

    /**
     * @constant propTypes
     * @type {Object}
     */
    static propTypes = {
        list: PropTypes.array.isRequired
    };

    /**
     * @method render
     * @return {XML}
     */
    render() {

        return (
            <ul>

                <li className="title">Weather for:</li>

                {this.props.list.map(name => {

                    return (
                        <li key={name}>
                            <NavLink to={`/${toSlug(name)}.html`} activeClassName="active">
                                {name}
                            </NavLink>
                        </li>
                    );

                })}

            </ul>
        );

    }

});
