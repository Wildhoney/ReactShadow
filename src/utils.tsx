import React, { FC, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { UseShadowArgs, UseShadowReturn } from './types';

export function useShadow({ delegatesFocus, styleSheets, ...props }: UseShadowArgs): UseShadowReturn {
    const containerRef = useRef<HTMLElement>(null);
    const [shadowRoot, setShadowRoot] = useState<null | ShadowRoot>(null);
    const Children = useMemo(
        (): FC => () => <>{shadowRoot ? createPortal(props.children, shadowRoot) : props.children}</>,
        [shadowRoot, props.children]
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
