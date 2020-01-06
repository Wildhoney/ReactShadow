import React, { useState, useEffect, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { decamelize } from 'humps';

function Noop({ children }) {
    return children;
}

function getStyleWrapper() {
    try {
        const styled = require('styled-components');
        return styled.StyleSheetManager;
    } catch {
        return Noop;
    }
}

function ShadowContent({ root, children }) {
    return createPortal(children, root);
}

ShadowContent.propTypes = {
    root: PropTypes.object.isRequired,
    children: PropTypes.node,
};

ShadowContent.defaultProps = { children: null };

const tags = new Map();

function createTag(options) {
    const ShadowRoot = forwardRef(
        ({ mode, delegatesFocus, styleSheets, children, ...props }, ref) => {
            const [node, setNode] = useState(null);
            const [root, setRoot] = useState(null);

            const Wrapper = getStyleWrapper();
            const key = `node_${mode}${delegatesFocus}`;

            useEffect(() => {
                if (node) {
                    try {
                        const root = node.attachShadow({
                            mode,
                            delegatesFocus,
                        });
                        styleSheets.length > 0 &&
                            (root.adoptedStyleSheets = styleSheets);

                        ref && typeof ref === 'function' && ref(node);
                        ref && 'current' in ref && (ref.current = node);

                        setRoot(root);
                    } catch (error) {
                        switch (error.name) {
                            case 'NotSupportedError':
                                styleSheets.length > 0 &&
                                    (root.adoptedStyleSheets = styleSheets);
                                break;
                            default:
                                throw error;
                        }
                    }
                }
            }, [node, styleSheets]);

            return (
                <options.tag key={key} ref={setNode} {...props}>
                    {root && (
                        <Wrapper target={root}>
                            <ShadowContent root={root}>
                                {children}
                            </ShadowContent>
                        </Wrapper>
                    )}
                </options.tag>
            );
        },
    );

    ShadowRoot.propTypes = {
        mode: PropTypes.oneOf(['open', 'closed']),
        delegatesFocus: PropTypes.bool,
        styleSheets: PropTypes.arrayOf(
            PropTypes.instanceOf(global.CSSStyleSheet),
        ),
        children: PropTypes.node,
    };

    ShadowRoot.defaultProps = {
        mode: 'open',
        delegatesFocus: false,
        styleSheets: [],
        children: null,
    };

    return ShadowRoot;
}

export function createProxy(target = {}) {
    return new Proxy(target, {
        get: function get(_, name) {
            const tag = decamelize(name, { separator: '-' });
            if (!tags.has(tag)) tags.set(tag, createTag({ tag }));
            return tags.get(tag);
        },
    });
}

export default createProxy();
