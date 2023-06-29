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

    type CreateProxyFn = (
        target: unknown,
        id: string,
        render: ({
            children,
        }: {
            children: React.ReactNode;
            ssr: boolean;
            root: ShadowRoot;
        }) => React.ReactNode,
    ) => Root;

    const createProxy: CreateProxyFn;
    const ReactShadowRoot: Root;
    const useShadowRoot: () => ShadowRoot;

    export default ReactShadowRoot;

    export { createProxy, useShadowRoot };
    export type { Root };
}
