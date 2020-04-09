import { createContext } from 'react';

export const Context = createContext(null);

export function handleError({ error, styleSheets, root }) {
    switch (error.name) {
        case 'NotSupportedError':
            styleSheets.length > 0 && (root.adoptedStyleSheets = styleSheets);
            break;
        default:
            throw error;
    }
}
