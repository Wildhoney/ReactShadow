
export * as api from "./api"
import moment from "moment"
import capitalise from 'capitalize';
import {Places, Place, Data, FormattedData} from "./types"

export function toSlug(name: string): string {
    return name.replace(/ /g, '-');
};

export function fromSlug(name:string):string {
    return name.replace(/-/g, ' ');
};

export function getFilename(country: string): string {
    return `/images/${toSlug(country).toLowerCase()}.png`;
};

export function pickPlace(places: Places): Place {
    return places[Math.floor(Math.random() * places.length)];
}

export function formatWeather(data: Data): FormattedData {
    const temperature = data ? Math.round(data.weather.main.temp) : 0;

    return {
        ...data,
        country: fromSlug(data.name),
        title: `${capitalise.words(data.weather.weather[0].description)} in ${fromSlug(
            data.name,
        )}`,
        label: `${temperature}${String.fromCharCode(8451)}`,
        fahrenheit: `${(temperature * 9) / 5 + 32}${String.fromCharCode(8457)}`,
        date: data ? moment(data.weather.date).utc() : null,
    };
};