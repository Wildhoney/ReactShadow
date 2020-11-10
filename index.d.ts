declare module 'react-shadow' {
    import * as React from 'react';

    interface IProps {
        mode?: 'open' | 'closed';
        delegatesFocus?: boolean;
        styleSheets?: CSSStyleSheet[];
        ssr?: boolean;
        children?: React.ReactNode;
    }

    type Root = {
        [name: string]: React.ComponentType<
            React.HTMLProps<HTMLElement> & IProps
        >;
    };

    const ReactShadowRoot: Root;

    export default ReactShadowRoot;
}
