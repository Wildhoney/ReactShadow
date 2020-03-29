import React from 'react';
import Country from '../Country';
import root from 'react-shadow';
import styles from './styles.css';

export default function Widget(props) {
    return (
        <root.section className="weather">
            <style type="text/css">{styles}</style>
            <Country {...props} />
        </root.section>
    );
}
