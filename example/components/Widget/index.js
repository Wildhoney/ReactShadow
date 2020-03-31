import React from 'react';
import root from 'react-shadow/styled-components';
import City from '../City';
import styles from './styles.css';

export default function Widget(props) {
    return (
        <root.section className="weather">
            <style type="text/css">{styles}</style>
            <City {...props} />
        </root.section>
    );
}
