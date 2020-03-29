import { get } from 'axios';
import { camelizeKeys } from 'humps';

export const countries = [
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
];

const apiKey = '07b72c930f0d226f7c6866cc753a678c';

export const fetch = async (country) => {
    const slug = country.replace(/-/g, '+');
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${slug}&appid=${apiKey}&units=metric`;
    const { data } = await get(url);
    return camelizeKeys(data);
};
