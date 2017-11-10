import { get }          from 'axios';
import { camelizeKeys } from 'humps';

/**
 * @constant API_KEY
 * @type {String}
 */
const API_KEY = '07b72c930f0d226f7c6866cc753a678c';

/**
 * @constant FETCH
 * @type {Symbol}
 */
export const FETCH = Symbol('fetch');

/**
 * @method fetchData
 * @param {String} country
 * @return {Object}
 */
export function fetchData(country) {

    return async dispatch => {

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${API_KEY}&units=metric`;
        const { data } = await get(url);

        dispatch({ type: FETCH, name: country, result: camelizeKeys(data) });

    };

}
