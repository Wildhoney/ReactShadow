import React from 'react';
import Layout from '../components/Layout';
import * as api from '../api';

export default function Country(props) {
    return <Layout {...props} />;
}

Country.getInitialProps = async ({ query }) => {
    return {
        name: query.name,
        weather: await api.fetch(query.name),
        countries: api.countries,
    };
};
