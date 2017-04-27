import React, { PropTypes, PureComponent } from 'react';
import { NavLink, withRouter }             from 'react-router-dom';
import { toSlug }                          from '../containers/layout';

export default withRouter(class extends PureComponent {

    /**
     * @constant propTypes
     * @type {Object}
     */
    static propTypes = {
        list: PropTypes.array.isRequired
    };

    /**
     * @method shouldComponentUpdate
     * @param {Object} nextProps
     * @return {Boolean}
     */
    shouldComponentUpdate(nextProps) {
        return this.props.match.params.country !== nextProps.match.params.country;
    }

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
