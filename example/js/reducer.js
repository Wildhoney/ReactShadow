import { FETCH } from './actions';

/**
 * @constant INITIAL_STATE
 * @type {Object}
 */
const INITIAL_STATE = {
    weather: {},
    countries: ['Amsterdam', 'Cairo', 'London', 'Moscow', 'Paris', 'Rio de Janeiro', 'Rome', 'Sydney', 'Mumbai', 'New York']
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case FETCH:

            return { ...state, weather: {
                ...state.weather,
                [action.name]: action.result
            }};

    }

    return state;

};
