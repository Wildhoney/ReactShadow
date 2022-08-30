import { ReactNode, ReactPortal, RefObject } from 'react';

export type Props = {
    Container: any;
    delegatesFocus?: boolean;
    styleSheets?: CSSStyleSheet[];
    fallback?: ReactNode;
    withSSR: boolean;
    children: ReactNode;
};

export type UseShadowArgs = Required<Pick<Props, 'delegatesFocus' | 'styleSheets' | 'withSSR' | 'children'>>;

export type UseShadowReturn = {
    ref: RefObject<HTMLElement>;
    shadowRoot: null | ShadowRoot;
    Children: ReactPortal | ReactNode;
};

declare global {
    interface ShadowRoot {
        adoptedStyleSheets: CSSStyleSheet[];
    }
}
