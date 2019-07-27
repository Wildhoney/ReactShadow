import React, { useState, useEffect, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { decamelize } from 'humps';

function ShadowContent({ root, children }) {
    return createPortal(children, root);
}

ShadowContent.propTypes = {
    root: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
};

function createComponent(options) {
    const ShadowRoot = forwardRef(
        ({ mode, delegatesFocus, styleSheets, children, ...props }, ref) => {
            const [node, setNode] = useState(null);
            const [root, setRoot] = useState(null);

            useEffect(() => {
                if (node) {
                    const root = node.attachShadow({ mode, delegatesFocus });
                    styleSheets.length > 0 &&
                        (root.adoptedStyleSheets = styleSheets);

                    ref && typeof ref === 'function' && ref(node);
                    ref && 'current' in ref && (ref.current = node);

                    setRoot(root);
                }
            }, [node]);

            return (
                <options.tag ref={setNode} {...props}>
                    {root && (
                        <ShadowContent root={root}>{children}</ShadowContent>
                    )}
                </options.tag>
            );
        },
    );

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

const components = new Map();

export function createProxy(target = {}) {
    return new Proxy(target, {
        get: function get(_, name) {
            const tag = decamelize(name, { separator: '-' });
            if (!components.has(tag))
                components.set(tag, createComponent({ tag }));
            return components.get(tag);
        },
    });
}

export default createProxy();
