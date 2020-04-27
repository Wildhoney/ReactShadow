import React from 'react';
import { renderToString } from 'react-dom/server';
import { StyleSheetManager, ServerStyleSheet } from 'styled-components';
import { createProxy } from '../';

export function getStyleSheets(children) {
    const sheet = new ServerStyleSheet();

    renderToString(
        <StyleSheetManager sheet={sheet.instance}>
            <>{children}</>
        </StyleSheetManager>,
    );

    return sheet.getStyleElement();
}

export default createProxy(
    {},
    'styled-components',
    ({ root, ssr, children }) => {
        if (ssr)
            return (
                <>
                    {getStyleSheets(children)}
                    {children}
                </>
            );

        return (
            <StyleSheetManager target={root}>
                <>{children}</>
            </StyleSheetManager>
        );
    },
);
