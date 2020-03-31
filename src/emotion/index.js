import React from 'react';
import { CacheProvider } from '@emotion/core';
import createCache from '@emotion/cache';
import { createProxy } from '../';

export default createProxy({}, 'emotion', ({ root, children }) => {
    const options = createCache({ container: root });

    return (
        <CacheProvider value={options}>
            <>{children}</>
        </CacheProvider>
    );
});
