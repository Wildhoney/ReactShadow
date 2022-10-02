import React, { ReactElement } from 'react';
import root from '../../../src';
import City from '../City';
import styles from './styles.css';
import {Props} from "./types"

export default function Widget({data}: Props): ReactElement {
    return (
        <root.section className="weather">
            <style type="text/css">{styles.toString()}</style>
            <City data={data}/>
        </root.section>
    );
}
