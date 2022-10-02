import React, { useMemo } from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { createAdapter } from './core';

export default new Proxy<Record<string, Element>>(
    {},
    {
        get(_, name: string) {
            return createAdapter(name, ({ root, children }) => {
                const options = useMemo(
                    () =>
                        createCache({
                            container: root,
                            key: 'react-shadow',
                        }),
                    [root]
                );

                return (
                    <CacheProvider value={options}>
                        <>{children}</>
                    </CacheProvider>
                );
            });
        },
    }
);
