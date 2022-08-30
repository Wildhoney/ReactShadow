import React, { ReactElement, useState } from 'react';
import root from '../../src';

export default function Home(): ReactElement {
    const [count, setCount] = useState(0);

    return (
        <div>
            Hey{' '}
            <root.countValue delegatesFocus>
                <button onClick={(): void => setCount(count - 1)}>-</button>
                <h1>{count}</h1>
                <button onClick={(): void => setCount(count + 1)}>+</button>
            </root.countValue>
        </div>
    );
}
