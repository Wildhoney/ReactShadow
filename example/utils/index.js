import capitalise from 'capitalize';
import moment from 'moment';
import router from 'next/router';

export const toSlug = (name) => {
    return name.replace(/ /g, '-');
};

export const fromSlug = (name) => {
    return name.replace(/-/g, ' ');
};

export const getFilename = (country) => {
    return `/images/${toSlug(country).toLowerCase()}.png`;
};

export const pickPlace = (places) =>
    places[Math.floor(Math.random() * places.length)];

export const formatWeather = (name, model) => {
    const tempature = model ? Math.round(model.main.temp) : null;

    return {
        ...model,
        country: fromSlug(name),
        title: `${capitalise.words(model.weather[0].description)} in ${fromSlug(
            name,
        )}`,
        label: `${tempature}${String.fromCharCode(8451)}`,
        fahrenheit: `${(tempature * 9) / 5 + 32}${String.fromCharCode(8457)}`,
        date: model ? moment(model.date).utc() : null,
    };
};

export function redirectPath(path, context = null) {
    if (context && context.res) {
        context.res.writeHead(302, {
            Location: path,
        });
        context.res.end();
    } else router.push(path);
}
