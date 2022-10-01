import React, { ReactElement } from 'react';
import { decamelize } from 'humps';
import { RootProps, Element } from './types';
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

export default new Proxy<Record<string, Element>>(
    {},
    {
        get(_, name: string) {
            const tagName = decamelize(name, { separator: '-' });

            if (!tags.has(name)) {
                tags.set(name, (props): ReactElement => {
                    return <ReactShadow {...props} Container={tagName} />;
                });
            }

            return tags.get(name);
        },
    }
);
