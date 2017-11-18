import React from 'react';
import { memoize, identity, once } from 'ramda';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom'
import ShadowDOM from '../../../src/react-shadow';
import Country from '../components/country';

/**
 * @method toSlug
 * @param {String} x
 * @return {String}
 */
export const toSlug = memoize(x => x.replace(/ /g, '-'));

/**
 * @method fromSlug
 * @param {String} x
 * @return {String}
 */
export const fromSlug = memoize(x => x.replace(/-/g, ' '));

/**
 * @method filenameFor
 * @param {String} x
 * @return {String}
 */
export const filenameFor = memoize(x => `/images/${toSlug(x).toLowerCase()}.png`);

/**
 * @method randomFrom
 * @param {Array} xs
 * @return {String}
 */
const randomFrom = once(xs => xs[Math.floor(Math.random() * xs.length)]);

/**
 * @param {Object} props
 * @return {XML}
 */
export default connect(identity)(props => {

    return (
        <BrowserRouter>
            <ShadowDOM include="css/country.css">
                <section className="weather">
                    <Route exact path="/" render={() => <Country {...props} country={randomFrom(props.countries)} />} />
                    <Route exact path="/:country.html" render={({ match }) => <Country {...props} country={match.params.country} />} />
                </section>
            </ShadowDOM>
        </BrowserRouter>
    );

});
