import capitalise from 'capitalize';
import * as R from 'ramda';

export const toSlug = name => {
    return name.replace(/ /g, '-');
};

export const fromSlug = name => {
    return name.replace(/-/g, ' ');
};

export const getFilename = country => {
    return `/images/${toSlug(country).toLowerCase()}.png`;
};

export const pickRandom = R.once(countries => {
    return countries[Math.floor(Math.random() * countries.length)];
});

export const getWeather = (weather, name) => {
    const model = weather.find(weather => weather.country === name) || null;
    const tempature = model ? Math.round(model.main.temp) : null;

    return {
        country: fromSlug(name),
        title: model
            ? `${capitalise.words(model.weather[0].description)} in ${fromSlug(
                  name,
              )}`
            : `Weather in ${name}`,
        label: model
            ? `${tempature}${String.fromCharCode(8451)}`
            : String.fromCharCode(8212),
        fahrenheit: model
            ? `${(tempature * 9) / 5 + 32}${String.fromCharCode(8457)}`
            : '',
        timezone: model ? model.timezone : null,
        date: model ? model.date : null,
    };
};
