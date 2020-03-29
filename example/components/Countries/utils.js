import * as utils from '../../utils';

export const getCountries = (countries) =>
    countries
        .sort((a, b) => a.localeCompare(b))
        .map((name) => ({
            name,
            slug: utils.toSlug(name),
            href: `/${utils.toSlug(name)}`,
        }));
