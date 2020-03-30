import React, { createContext } from 'react';

export const Context = createContext(null);

function Noop({ children }) {
    return children;
}

export function getStyleWrapper() {
    try {
        const styled = require('styled-components');
        if (!('StyleSheetManager' in styled))
            throw new Error(
                '`StyleSheetManager` not found in `styled-components` library.',
            );
        return styled.StyleSheetManager;
    } catch {
        return Noop;
    }
}

export function getStyleElements(children) {
    try {
        const reactDom = require('react-dom/server');
        const styled = require('styled-components');
        const sheet = new styled.ServerStyleSheet();

        reactDom.renderToString(
            <styled.StyleSheetManager sheet={sheet.instance}>
                {children}
            </styled.StyleSheetManager>,
        );

        return sheet.getStyleElement();
    } catch {
        return Noop;
    }
}

export function handleError({ error, styleSheets, root }) {
    switch (error.name) {
        case 'NotSupportedError':
            styleSheets.length > 0 && (root.adoptedStyleSheets = styleSheets);
            break;
        default:
            throw error;
    }
}
