import React, {
    useState,
    useEffect,
    forwardRef,
    createContext,
    useContext,
} from 'react';
import { useEnsuredForwardedRef } from 'react-use';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { decamelize } from 'humps';

const ShadowRootContext = createContext(null);

export function useShadowRoot() {
    return useContext(ShadowRootContext);
}

function Noop({ children }) {
    return children;
}

function getStyleWrapper() {
    try {
        const styled = require('styled-components');
        if (!('StyleSheetManager' in styled))
            throw new Error(
                '`StyleSheetManager` not found in `styled-components` library.',
            );
        return styled.StyleSheetManager;
    } catch {
        return Noop;
    }
}

function getStyleElements(children) {
    try {
        const reactDom = require('react-dom/server');
        const styled = require('styled-components');
        const sheet = new styled.ServerStyleSheet();

        reactDom.renderToString(
            <styled.StyleSheetManager sheet={sheet.instance}>
                <>{children}</>
            </styled.StyleSheetManager>,
        );

        return sheet.getStyleElement();
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
        (
            { mode, delegatesFocus, styleSheets, ssr, children, ...props },
            ref,
        ) => {
            const node = useEnsuredForwardedRef(ref);
            const [root, setRoot] = useState(null);

            const Wrapper = getStyleWrapper();
            const key = `node_${mode}${delegatesFocus}`;

            useEffect(() => {
                if (ssr) {
                    const root = node.current.shadowRoot;
                    return setRoot(root);
                }

                if (node.current) {
                    try {
                        typeof ref === 'function' && ref(node.current);

                        const root = node.current.attachShadow({
                            mode,
                            delegatesFocus,
                        });
                        styleSheets.length > 0 &&
                            (root.adoptedStyleSheets = styleSheets);

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
            }, [ref, node, styleSheets]);

            return (
                <>
                    <options.tag key={key} ref={node} {...props}>
                        {(root || ssr) && (
                            <ShadowRootContext.Provider value={root}>
                                <Wrapper target={root}>
                                    {ssr ? (
                                        <template shadowroot="open">
                                            {getStyleElements(children)}
                                            {children}
                                        </template>
                                    ) : (
                                        <ShadowContent root={root}>
                                            {children}
                                        </ShadowContent>
                                    )}
                                </Wrapper>
                            </ShadowRootContext.Provider>
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
