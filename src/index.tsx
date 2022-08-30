import React, { FC, ReactElement, ReactNode } from 'react';
import { decamelize } from 'humps';
import { ComponentProps, ProxyProps } from './types';
import { useShadow } from './utils';

function ReactShadow({
    Container,
    withSSR = false,
    delegatesFocus = false,
    styleSheets = [],
    fallback,
    children,
}: ComponentProps): ReactElement {
    const shadow = useShadow({ delegatesFocus, styleSheets, withSSR, children });

    console.log('render...');

    return (
        <Container ref={shadow.ref}>
            <shadow.Children />
        </Container>
    );
}

const tags = new Map<string, typeof ReactShadow>();

export default new Proxy({} as Record<string, FC<ProxyProps>>, {
    get(_, name: string) {
        const tagName = decamelize(name, { separator: '-' });

        !tags.has(name) &&
            tags.set(name, (props: ProxyProps): ReactElement => <ReactShadow Container={tagName} {...props} />);

        return tags.get(name);
    },
});
