import React from 'react';
import Layout from '../components/Layout';
import * as api from '../api';
import * as utils from '../utils';

export default function City(props) {
    return <Layout {...props} />;
}

City.getInitialProps = async ({ query }) => {
    const place = api.places.find(
        ({ city }) => utils.toSlug(city) === query.name,
    );

    return {
        name: place.city,
        cities: api.places.map(({ city }) => city),
        weather: await api.fetch(`${place.city}, ${place.country}`),
    };
};
