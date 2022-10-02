import * as api from "./api"
import {Moment} from "moment"

export type Places = typeof api.places;

export type Place = Places[0]

export type Data = {
    name: string,
    cities: string[],
    weather: {
        main: {
            temp: number
        },
        date: string,
        timezone: string,
        weather: [{
            id: number,
            main: string,
            description: string,
            icon: string
          }]
    }
}

export type FormattedData = Data & {
    title: string,
    country: string,
    label: string,
    fahrenheit: string,
    date: null|Moment
}