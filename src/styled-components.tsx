import { Element } from './types';
import { createAdapter } from './core';
import { StyleSheetManager } from 'styled-components';
import React from 'react';

export default new Proxy<Record<string, Element>>(
    {},
    {
        get(_, name: string) {
            return createAdapter(name, ({ root, children }) => {
                console.log(root);

                if (!root) return children;

                return (
                    <StyleSheetManager target={root}>
                        <>{children}</>
                    </StyleSheetManager>
                );
            });
        },
    }
);
