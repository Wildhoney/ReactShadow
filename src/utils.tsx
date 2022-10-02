import React, { FC, Fragment, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { UseShadowArgs, UseShadowReturn, ChildrenProps, NoopProps } from './types';

function Noop({ children }: NoopProps): ReactNode {
    return children;
}

export function useShadow({ Container, delegatesFocus, styleSheets, ...props }: UseShadowArgs): UseShadowReturn {
    const containerRef = useRef<HTMLElement>(null);
    const [shadowRoot, setShadowRoot] = useState<null | ShadowRoot>(null);

    const Children = useMemo(
        (): FC<ChildrenProps> =>
            ({ children }) => {
                const Wrapper = !shadowRoot ? Noop : Container;

                return (
                    <Wrapper root={shadowRoot}>
                        {shadowRoot ? createPortal(children, shadowRoot) : props.children}
                    </Wrapper>
                );
            },
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
