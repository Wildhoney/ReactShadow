import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { UseShadowArgs, UseShadowReturn, ChildrenProps } from './types';

export function useShadow({ Container, delegatesFocus, styleSheets, ...props }: UseShadowArgs): UseShadowReturn {
    const containerRef = useRef<HTMLElement>(null);
    const [shadowRoot, setShadowRoot] = useState<null | ShadowRoot>(null);

    const Children = useMemo(
        (): FC<ChildrenProps> =>
            ({ children }) =>
                (
                    <Container root={shadowRoot}>
                        {shadowRoot ? createPortal(children, shadowRoot) : props.children}
                    </Container>
                ),
        [shadowRoot]
    );

    useEffect((): void => {
        setShadowRoot((): null | ShadowRoot => {
            try {
                const root =
                    containerRef.current?.shadowRoot ??
                    containerRef.current?.attachShadow({ mode: 'open', delegatesFocus });
                root && (root.adoptedStyleSheets = styleSheets);
                return root ?? null;
            } catch {
                return null;
            }
        });
    }, []);

    return useMemo(() => ({ ref: containerRef, shadowRoot, Children }), [containerRef, shadowRoot, Children]);
}
