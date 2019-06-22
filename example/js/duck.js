import { get } from 'axios';
import { camelizeKeys } from 'humps';
import moment from 'moment';

const initialState = {
    weather: [],
    countries: [
        'Amesbury',
        'Amsterdam',
        'Athens',
        'Brussels',
        'Cairo',
        'Cancun',
        'Dubai',
        'Hanga Roa',
        'Istanbul',
        'Jordan',
        'London',
        'Moscow',
        'Mumbai',
        'Munich',
        'New Delhi',
        'New York',
        'Paris',
        'Patagonia',
        'Phuket',
        'Pisa',
        'Rio de Janeiro',
        'Rome',
        'Sydney',
        'Venice',
    ],
};

const apiKey = '07b72c930f0d226f7c6866cc753a678c';

const actionTypes = {
    fetch: Symbol('fetch'),
};

export const actions = {
    fetch: (country, options = { cache: true }) => {
        return async (dispatch, getState) => {
            const hasCountry =
                options.cache &&
                getState().weather.find(weather => weather.country === country);

            if (hasCountry) return null;

            const slug = country.replace(/-/g, '+');
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${slug}&appid=${apiKey}&units=metric`;
            const { data } = await get(url);

            dispatch({
                type: actionTypes.fetch,
                payload: {
                    country,
                    date: moment().utc(),
                    ...camelizeKeys(data),
                },
            });
        };
    },
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.fetch:
            const weather = state.weather.filter(
                ({ country }) => country !== action.payload.country,
            );
            return {
                ...state,
                weather: [...weather, action.payload],
            };
    }

    return state;
}
