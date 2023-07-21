import React, { useState, useLayoutEffect, forwardRef } from 'react';
import { useEnsuredForwardedRef } from '../hooks';
import { createPortal } from 'react-dom';
import { renderToString } from 'react-dom/server';
import PropTypes from 'prop-types';
import * as utils from '../utils';

function Template({ children, ...attrs }) {
    if (typeof children !== 'string') {
        children = renderToString(children);
    }

    return (
        <template {...attrs} dangerouslySetInnerHTML={{ __html: children }} />
    );
}

Template.propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

Template.defaultProps = { children: '' };

function ShadowContent({ root, children }) {
    return createPortal(children, root);
}

ShadowContent.propTypes = {
    root: PropTypes.object.isRequired,
    children: PropTypes.node,
};

ShadowContent.defaultProps = { children: null };

export default function create(options) {
    const ShadowRoot = forwardRef(
        (
            { mode, delegatesFocus, styleSheets, ssr, children, ...props },
            ref,
        ) => {
            const node = useEnsuredForwardedRef(ref);
            const [root, setRoot] = useState(null);
            const key = `node_${mode}${delegatesFocus}`;

            useLayoutEffect(() => {
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
                                {ssr ? (
                                    <Template shadowroot={mode} shadowrootmode={mode}>
                                        {options.render({
                                            root,
                                            ssr,
                                            children,
                                        })}
                                    </Template>
                                ) : (
                                    <ShadowContent root={root}>
                                        {options.render({
                                            root,
                                            ssr,
                                            children,
                                        })}
                                    </ShadowContent>
                                )}
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
            PropTypes.instanceOf(globalThis.CSSStyleSheet),
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
