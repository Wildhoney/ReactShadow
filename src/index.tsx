import { Element } from './types';
import { createAdapter } from './core';

export default new Proxy<Record<string, Element>>(
    {},
    {
        get(_, name: string) {
            return createAdapter(name);
        },
    }
);
