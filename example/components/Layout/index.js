import React from 'react';
import Widget from '../../components/Widget';
import styles from './styles.css';

export default function Layout(props) {
    return (
        <section className="container">
            <style type="text/css">{styles}</style>
            <Widget {...props} />
        </section>
    );
}
