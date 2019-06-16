import { get } from 'axios';
import { camelizeKeys } from 'humps';

const initialState = {
    weather: [],
    countries: [
        'Amsterdam',
        'Cairo',
        'London',
        'Moscow',
        'Mumbai',
        'New York',
        'Paris',
        'Rio de Janeiro',
        'Rome',
        'Sydney',
    ],
};

const apiKey = '07b72c930f0d226f7c6866cc753a678c';

const actionTypes = {
    fetch: Symbol('fetch'),
};

export const actions = {
    fetch: country => {
        return async (dispatch, getState) => {
            const hasCountry = getState().weather.find(
                weather => weather.country === country,
            );

            if (hasCountry) return null;

            const slug = country.replace(/-/g, '+');
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${slug}&appid=${apiKey}&units=metric`;
            const { data } = await get(url);

            dispatch({
                type: actionTypes.fetch,
                payload: { country, ...camelizeKeys(data) },
            });
        };
    },
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.fetch:
            return {
                ...state,
                weather: [...state.weather, action.payload],
            };
    }

    return state;
}
