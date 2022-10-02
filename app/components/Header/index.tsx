import React, { ReactElement } from 'react';
import root from '../../../src/emotion';
import * as e from './styles';
import { Props } from './types';

export default function Header({ children }: Props): ReactElement {
    return (
        <root.header>
            <e.H3>{children}</e.H3>
        </root.header>
    );
}
