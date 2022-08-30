import React, { ReactElement } from 'react';
import { decamelize } from 'humps';
import { Props } from './types';
import { useShadow } from './utils';

export default function ReactShadow({
    Container = 'div',
    withSSR = false,
    delegatesFocus = false,
    styleSheets = [],
    fallback,
    children,
}: Props): ReactElement {
    const shadow = useShadow({ delegatesFocus, styleSheets, withSSR, children });

    console.log('render...');

    return (
        <Container ref={shadow.ref}>
            <shadow.Children />
        </Container>
    );
}

const tags = new Map<string, typeof ReactShadow>();

// export default new Proxy({} as Record<string, string>, {
//     get(_, name: string) {
//         const tagName = decamelize(name, { separator: '-' });

//         !tags.has(name) &&
//             tags.set(
//                 name,
//                 (props: Omit<Props, 'Container'>): ReactElement => <ReactShadow Container={tagName} {...props} />
//             );

//         return tags.get(name);
//     },
// });
