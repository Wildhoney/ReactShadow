import React, { useState, useEffect, useContext, forwardRef } from 'react';
import { useEnsuredForwardedRef } from 'react-use';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { decamelize } from 'humps';
import * as utils from './utils';

export function useShadowRoot() {
    return useContext(utils.Context);
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
        (
            { mode, delegatesFocus, styleSheets, ssr, children, ...props },
            ref,
        ) => {
            const node = useEnsuredForwardedRef(ref);
            const [root, setRoot] = useState(null);

            const Wrapper = utils.getStyleWrapper();
            const key = `node_${mode}${delegatesFocus}`;

            useEffect(() => {
                if (node.current) {
                    try {
                        typeof ref === 'function' && ref(node.current);

                        if (ssr) {
                            const root = node.current.shadowRoot;
                            setRoot(root);
                            return;
                        }

                        const root = node.current.attachShadow({
                            mode,
                            delegatesFocus,
                        });
                        styleSheets.length > 0 &&
                            (root.adoptedStyleSheets = styleSheets);
                        setRoot(root);
                    } catch (error) {
                        utils.handleError({ error, styleSheets, root });
                    }
                }
            }, [ref, node, styleSheets]);

            return (
                <>
                    <options.tag key={key} ref={node} {...props}>
                        {(root || ssr) && (
                            <utils.Context.Provider value={root}>
                                <Wrapper target={root}>
                                    {ssr ? (
                                        <template shadowroot="open">
                                            {utils.getStyleElements(children)}
                                            {children}
                                        </template>
                                    ) : (
                                        <ShadowContent root={root}>
                                            {children}
                                        </ShadowContent>
                                    )}
                                </Wrapper>
                            </utils.Context.Provider>
                        )}
                    </options.tag>
                </>
            );
        },
    );

    ShadowRoot.propTypes = {
        mode: PropTypes.oneOf(['open', 'closed']),
        delegatesFocus: PropTypes.bool,
        styleSheets: PropTypes.arrayOf(
            PropTypes.instanceOf(global.CSSStyleSheet),
        ),
        ssr: PropTypes.bool,
        children: PropTypes.node,
    };

    ShadowRoot.defaultProps = {
        mode: 'open',
        delegatesFocus: false,
        styleSheets: [],
        ssr: false,
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
