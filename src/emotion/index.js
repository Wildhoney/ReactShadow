import React from 'react';
import { renderToString } from 'react-dom/server';
import { CacheProvider } from '@emotion/core';
import createCache from '@emotion/cache';
import { renderStylesToString } from 'emotion-server';
import { createProxy } from '../';

const cache = new Map();

export function getStyles(children) {
    return renderStylesToString(renderToString(<>{children}</>));
}

export default createProxy({}, 'emotion', ({ ssr, root, children }) => {
    const options =
        cache.get(root) ||
        (() => {
            const options = createCache({ container: root });
            cache.set(root, options);
            return options;
        })();

    if (ssr)
        return (
            <>
                <style type="text/css">{getStyles(children)}</style>
                {children}
            </>
        );

    return (
        <CacheProvider value={options}>
            <>{children}</>
        </CacheProvider>
    );
});
