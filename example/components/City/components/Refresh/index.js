import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import root from 'react-shadow/material-ui';
import * as utils from '../../../../utils';
import * as e from './styles';

export default function Refresh({ name }) {
    return (
        <root.div>
            <Link href="/[name]" as={`/${utils.toSlug(name)}`}>
                <e.IconButton>Refresh</e.IconButton>
            </Link>
        </root.div>
    );
}

Refresh.propTypes = { name: PropTypes.string.isRequired };
