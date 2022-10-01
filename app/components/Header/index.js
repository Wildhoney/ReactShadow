import React from 'react';
import PropTypes from 'prop-types';
import root from 'react-shadow/emotion';
import * as e from './styles';

export default function Header({ children }) {
    return (
        <root.header>
            <e.H3>{children}</e.H3>
        </root.header>
    );
}

Header.propTypes = { children: PropTypes.node.isRequired };
