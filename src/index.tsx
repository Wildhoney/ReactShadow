import React, { FC, ReactElement } from 'react';
import { decamelize } from 'humps';
import { RootProps, ProxyProps } from './types';
import { useShadow } from './utils';

function ReactShadow({
    Container,
    delegatesFocus = false,
    styleSheets = [],
    fallback,
    children,
    ...props
}: RootProps): ReactElement {
    const shadow = useShadow({ delegatesFocus, styleSheets, children });

    return (
        <Container ref={shadow.ref} {...props}>
            <shadow.Children>{children}</shadow.Children>
        </Container>
    );
}

const tags = new Map<string, typeof ReactShadow>();

export default new Proxy({} as Record<string, FC<ProxyProps<'div'>>>, {
    get(_, name: string) {
        const tagName = decamelize(name, { separator: '-' });

        if (!tags.has(name)) {
            tags.set(name, (props: ProxyProps<'div'>): ReactElement => {
                return <ReactShadow Container={tagName} {...props} />;
            });
        }

        return tags.get(name);
    },
});
