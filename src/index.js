import { useContext } from 'react';
import { decamelize } from 'humps';
import create from './core';
import * as utils from './utils';

const tags = new Map();

export function useShadowRoot() {
    return useContext(utils.Context);
}

export function createProxy(target = {}, render = ({ children }) => children) {
    return new Proxy(target, {
        get: function get(_, name) {
            const tag = decamelize(name, { separator: '-' });
            if (!tags.has(tag)) tags.set(tag, create({ tag, render }));
            return tags.get(tag);
        },
    });
}

export default createProxy();
