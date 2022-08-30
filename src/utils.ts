import { ReactElement, ReactNode, ReactPortal, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { UseShadowArgs, UseShadowReturn } from './types';

export function useShadow({ delegatesFocus, styleSheets, children }: UseShadowArgs): UseShadowReturn {
    const containerRef = useRef<HTMLElement>(null);
    const [shadowRoot, setShadowRoot] = useState<null | ShadowRoot>(null);

    function Children(): ReactPortal | ReactNode {
        return shadowRoot ? createPortal(children, shadowRoot) : children;
    }

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
