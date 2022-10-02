import React from 'react';
import * as e from './styles';
import root from '../../../../../src/styled-components';

export default function Image(props) {
    return (
        <root.div>
            <e.Image {...props} />
        </root.div>
    );
}
