declare module 'react-shadow/material-ui' {
    import * as React from 'react';

    type Root = {
        [name: string]: React.ComponentType;
    };

    const ReactShadowRoot: Root;

    export default ReactShadowRoot;
}
