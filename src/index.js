import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

function ShadowContent({ root, children }) {
    return createPortal(children, root);
}

ShadowContent.propTypes = {
    root: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

function getShadowRoot(options) {
    function ShadowRoot({ children, ...props }) {
        const [node, setNode] = useState(null);
        const [root, setRoot] = useState(null);

        useEffect(() => {
            node && setRoot(node.attachShadow({ mode: 'open' }));
        }, [node]);

        return (
            <options.tag {...props} ref={node => setNode(node)}>
                {root && <ShadowContent root={root}>{children}</ShadowContent>}
            </options.tag>
        );
    }

    ShadowRoot.propTypes = {
        children: PropTypes.node.isRequired,
    };

    return ShadowRoot;
}

const handler = {
    get: function(_, tag) {
        return getShadowRoot({
            tag,
        });
    },
};

export default new Proxy({}, handler);
