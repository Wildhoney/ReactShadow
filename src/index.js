import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

function ShadowContent({ root, children }) {
    return createPortal(children, root);
}

ShadowContent.propTypes = {
    root: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
};

function createComponent(tag) {
    function ShadowRoot({
        mode,
        delegatesFocus,
        styleSheets,
        children,
        ...props
    }) {
        const container = { tag };
        const [node, setNode] = useState(null);
        const [root, setRoot] = useState(null);

        useEffect(() => {
            if (node) {
                const root = node.attachShadow({ mode, delegatesFocus });
                styleSheets.length > 0 &&
                    (root.adoptedStyleSheets = styleSheets);
                setRoot(root);
            }
        }, [node]);

        return (
            <container.tag {...props} ref={setNode}>
                {root && <ShadowContent root={root}>{children}</ShadowContent>}
            </container.tag>
        );
    }

    ShadowRoot.propTypes = {
        mode: PropTypes.oneOf(['open', 'closed']),
        delegatesFocus: PropTypes.bool,
        styleSheets: PropTypes.arrayOf(PropTypes.string),
        children: PropTypes.node.isRequired,
    };

    ShadowRoot.defaultProps = {
        mode: 'open',
        delegatesFocus: false,
        styleSheets: [],
    };

    return ShadowRoot;
}

const componentRegistry = new Map();

export default new Proxy(
    {},
    {
        get: (_, tag) => {
            if (!componentRegistry.has(tag))
                componentRegistry.set(tag, createComponent(tag));
            return componentRegistry.get(tag);
        },
    },
);
