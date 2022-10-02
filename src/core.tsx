import React, { ReactElement, ReactNode } from 'react';
import { RootProps, WrapperProps } from './types';
import { decamelize } from 'humps';
import { useShadow } from './utils';

function ReactShadow({
    elementName,
    Container,
    delegatesFocus = false,
    styleSheets = [],
    fallback,
    children,
    ...props
}: RootProps): ReactElement {
    const ElementName = elementName;
    const shadow = useShadow({ delegatesFocus, styleSheets, children, Container });

    return (
        <ElementName ref={shadow.ref} {...props}>
            <shadow.Children>{children}</shadow.Children>
        </ElementName>
    );
}

function ReactShadowDefaultContainer({ children }: WrapperProps): null | ReactNode {
    return children;
}

const tags = new Map<string, typeof ReactShadow>();

export function createAdapter(name: string, Container = ReactShadowDefaultContainer) {
    const elementName = decamelize(name, { separator: '-' });

    if (!tags.has(name)) {
        tags.set(name, (props): ReactElement => {
            return <ReactShadow {...props} elementName={elementName} Container={Container} />;
        });
    }

    return tags.get(name);
}
