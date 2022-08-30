import { FC, ReactNode, RefObject } from 'react';

export type ComponentProps = {
    Container: any;
    delegatesFocus?: boolean;
    styleSheets?: CSSStyleSheet[];
    fallback?: ReactNode;
    withSSR?: boolean;
    children: ReactNode;
};

export type ProxyProps = Omit<ComponentProps, 'Container'> & { children: ReactNode };

export type ChildrenProps = { children: ReactNode };

export type UseShadowArgs = Required<Pick<ComponentProps, 'delegatesFocus' | 'styleSheets' | 'withSSR' | 'children'>>;

export type UseShadowReturn = {
    ref: RefObject<HTMLElement>;
    shadowRoot: null | ShadowRoot;
    Children: FC<ChildrenProps>;
};

declare global {
    interface ShadowRoot {
        adoptedStyleSheets: CSSStyleSheet[];
    }
}
