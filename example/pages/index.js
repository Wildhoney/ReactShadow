import * as api from '../api';
import * as utils from '../utils';

export default function Index() {
    return null;
}

Index.getInitialProps = async (context) => {
    const name = utils.pickCountry(api.countries);
    utils.redirectPath(utils.toSlug(name), context);
};
