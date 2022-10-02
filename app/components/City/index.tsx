import React, { ReactElement } from 'react';
import * as utils from '../../utils';
import Countries from '../Countries';
// import Image from './components/Image';
// import Refresh from './components/Refresh';
import {Props} from "./types"

export default function City({ data }: Props): ReactElement {
    const { title, label, fahrenheit, weather, date } = utils.formatWeather(data);

    return (
        <span>
            {/* <Refresh name={name} /> */}

            <main>
                {/* <Image src={utils.getFilename(name)} alt={name} /> */}

                <h1>
                    {title} at{' '}
                    {weather.timezone && date
                        ? date.add(weather.timezone, 'seconds').format('HH:mm:ss')
                        : String.fromCharCode(8212)}
                </h1>

                <h2 title={fahrenheit}>{label}</h2>

                {/* <Countries name={utils.fromSlug(data.name)} cities={data.cities} /> */}
            </main>
        </span>
    );
}