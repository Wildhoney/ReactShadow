import { redirect } from '@remix-run/node';
import * as utils from '../utils';

export function loader() {
    const place = utils.pickPlace(utils.api.places);
    return redirect(`/${place.city}`);
}
