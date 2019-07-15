import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import root from 'react-shadow';
import * as utils from '../../utils';
import Country from '../Country';
import styles from './styles.css';

function Layout(props) {
    return (
        <BrowserRouter>
            <root.section className="weather">
                <style type="text/css">{styles}</style>
                <Route
                    exact
                    path="/"
                    render={() => (
                        <Redirect
                            to={`/${utils.toSlug(
                                utils.pickRandom(props.countries),
                            )}.html`}
                        />
                    )}
                />
                <Route
                    exact
                    path="/:country.html"
                    render={({ match }) => (
                        <Country country={match.params.country} />
                    )}
                />
            </root.section>
        </BrowserRouter>
    );
}

Layout.propTypes = {
    countries: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(Layout);
