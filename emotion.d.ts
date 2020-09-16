declare module 'react-shadow/emotion' {
    import * as React from 'react';

    type Root = {
        [name: string]: React.ComponentType<React.HTMLProps<HTMLElement>>;
    };

    const ReactShadowRoot: Root;

    export default ReactShadowRoot;
}
