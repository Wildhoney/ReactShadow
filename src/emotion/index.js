import React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { createProxy } from '../';

const cache = new WeakMap();

export default createProxy({}, 'emotion', ({ root, children }) => {
    const options =
        cache.get(root) ||
        (() => {
            const options = createCache({
                container: root,
                key: 'react-shadow',
            });
            cache.set(root, options);
            return options;
        })();

    return (
        <CacheProvider value={options}>
            <>{children}</>
        </CacheProvider>
    );
});
