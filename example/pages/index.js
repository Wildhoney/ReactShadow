import * as api from '../api';
import * as utils from '../utils';

export default function Index() {
    return null;
}

Index.getInitialProps = async (context) => {
    const place = utils.pickPlace(api.places);
    utils.redirectPath(utils.toSlug(place.city), context);
};
