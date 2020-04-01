import React from 'react';
import { CacheProvider } from '@emotion/core';
import createCache from '@emotion/cache';
import { createProxy } from '../';

const cache = new Map();

export default createProxy({}, 'emotion', ({ root, children }) => {
    const options =
        cache.get(root) ||
        (() => {
            const options = createCache({ container: root });
            cache.set(root, options);
            return options;
        })();

    return (
        <CacheProvider value={options}>
            <>{children}</>
        </CacheProvider>
    );
});
