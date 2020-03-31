import React from 'react';
import { StyleSheetManager, ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom';
import { createProxy } from '../';

export function getStyleSheets(children) {
    const sheet = new ServerStyleSheet();

    renderToString(
        <StyleSheetManager sheet={sheet.instance}>
            {children}
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
