var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
        for (var name in all) __defProp(target, name, { get: all[name], enumerable: !0 });
    },
    __copyProps = (to, from, except, desc) => {
        if ((from && typeof from == 'object') || typeof from == 'function')
            for (let key of __getOwnPropNames(from))
                !__hasOwnProp.call(to, key) &&
                    key !== except &&
                    __defProp(to, key, {
                        get: () => from[key],
                        enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
                    });
        return to;
    };
var __toCommonJS = (mod) => __copyProps(__defProp({}, '__esModule', { value: !0 }), mod);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
    assets: () => assets_manifest_default,
    assetsBuildDirectory: () => assetsBuildDirectory,
    entry: () => entry,
    publicPath: () => publicPath,
    routes: () => routes,
});
module.exports = __toCommonJS(stdin_exports);

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
    default: () => handleRequest,
});
var import_stream = require('stream'),
    import_server = require('react-dom/server'),
    import_react = require('@remix-run/react'),
    import_node = require('@remix-run/node'),
    import_jsx_dev_runtime = require('react/jsx-dev-runtime'),
    ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
    return new Promise((resolve, reject) => {
        let didError = !1,
            { pipe, abort } = (0, import_server.renderToPipeableStream)(
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    import_react.RemixServer,
                    {
                        context: remixContext,
                        url: request.url,
                    },
                    void 0,
                    !1,
                    {
                        fileName: 'app/entry.server.tsx',
                        lineNumber: 19,
                        columnNumber: 56,
                    },
                    this
                ),
                {
                    onShellReady() {
                        let body = new import_stream.PassThrough();
                        responseHeaders.set('Content-Type', 'text/html'),
                            resolve(
                                new import_node.Response(body, {
                                    status: didError ? 500 : responseStatusCode,
                                    headers: responseHeaders,
                                })
                            ),
                            pipe(body);
                    },
                    onShellError(err) {
                        reject(err);
                    },
                    onError(error) {
                        (didError = !0), console.error(error);
                    },
                }
            );
        setTimeout(abort, ABORT_DELAY);
    });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
    default: () => Root,
    meta: () => meta,
});
var import_react2 = require('@remix-run/react'),
    import_jsx_dev_runtime = require('react/jsx-dev-runtime'),
    meta = () => ({
        charset: 'utf-8',
        title: 'New Remix App',
        viewport: 'width=device-width,initial-scale=1',
    });
function Root() {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        'html',
        {
            lang: 'en',
            children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    'head',
                    {
                        children: [
                            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                                import_react2.Meta,
                                {},
                                void 0,
                                !1,
                                {
                                    fileName: 'app/root.tsx',
                                    lineNumber: 16,
                                    columnNumber: 17,
                                },
                                this
                            ),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                                import_react2.Links,
                                {},
                                void 0,
                                !1,
                                {
                                    fileName: 'app/root.tsx',
                                    lineNumber: 17,
                                    columnNumber: 17,
                                },
                                this
                            ),
                        ],
                    },
                    void 0,
                    !0,
                    {
                        fileName: 'app/root.tsx',
                        lineNumber: 15,
                        columnNumber: 13,
                    },
                    this
                ),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    'body',
                    {
                        children: [
                            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                                import_react2.Outlet,
                                {},
                                void 0,
                                !1,
                                {
                                    fileName: 'app/root.tsx',
                                    lineNumber: 21,
                                    columnNumber: 17,
                                },
                                this
                            ),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                                import_react2.ScrollRestoration,
                                {},
                                void 0,
                                !1,
                                {
                                    fileName: 'app/root.tsx',
                                    lineNumber: 22,
                                    columnNumber: 17,
                                },
                                this
                            ),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                                import_react2.Scripts,
                                {},
                                void 0,
                                !1,
                                {
                                    fileName: 'app/root.tsx',
                                    lineNumber: 23,
                                    columnNumber: 17,
                                },
                                this
                            ),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                                import_react2.LiveReload,
                                {},
                                void 0,
                                !1,
                                {
                                    fileName: 'app/root.tsx',
                                    lineNumber: 24,
                                    columnNumber: 17,
                                },
                                this
                            ),
                        ],
                    },
                    void 0,
                    !0,
                    {
                        fileName: 'app/root.tsx',
                        lineNumber: 20,
                        columnNumber: 13,
                    },
                    this
                ),
            ],
        },
        void 0,
        !0,
        {
            fileName: 'app/root.tsx',
            lineNumber: 14,
            columnNumber: 9,
        },
        this
    );
}

// app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
    default: () => Home,
});

// src/index.tsx
var import_humps = require('humps');

// src/utils.tsx
var import_react3 = require('react'),
    import_react_dom = require('react-dom'),
    import_jsx_dev_runtime = require('react/jsx-dev-runtime');
function useShadow({ delegatesFocus, styleSheets, ...props }) {
    let containerRef = (0, import_react3.useRef)(null),
        [shadowRoot, setShadowRoot] = (0, import_react3.useState)(null),
        Children = (0, import_react3.useMemo)(
            () =>
                ({ children }) =>
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                        import_jsx_dev_runtime.Fragment,
                        {
                            children: shadowRoot
                                ? (0, import_react_dom.createPortal)(children, shadowRoot)
                                : props.children,
                        },
                        void 0,
                        !1,
                        {
                            fileName: 'src/utils.tsx',
                            lineNumber: 11,
                            columnNumber: 17,
                        },
                        this
                    ),
            [shadowRoot]
        );
    return (
        (0, import_react3.useEffect)(() => {
            setShadowRoot(() => {
                var _a, _b;
                try {
                    let root =
                        ((_a = containerRef.current) == null ? void 0 : _a.shadowRoot) ??
                        ((_b = containerRef.current) == null
                            ? void 0
                            : _b.attachShadow({ mode: 'open', delegatesFocus }));
                    return root && (root.adoptedStyleSheets = styleSheets), root ?? null;
                } catch {
                    return null;
                }
            });
        }, []),
        (0, import_react3.useMemo)(
            () => ({ ref: containerRef, shadowRoot, Children }),
            [containerRef, shadowRoot, Children]
        )
    );
}

// src/index.tsx
var import_jsx_dev_runtime = require('react/jsx-dev-runtime');
function ReactShadow({ Container, withSSR = !1, delegatesFocus = !1, styleSheets = [], fallback, children, ...props }) {
    let shadow = useShadow({ delegatesFocus, styleSheets, withSSR, children });
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        Container,
        {
            ref: shadow.ref,
            ...props,
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                shadow.Children,
                {
                    children,
                },
                void 0,
                !1,
                {
                    fileName: 'src/index.tsx',
                    lineNumber: 19,
                    columnNumber: 13,
                },
                this
            ),
        },
        void 0,
        !1,
        {
            fileName: 'src/index.tsx',
            lineNumber: 18,
            columnNumber: 9,
        },
        this
    );
}
var tags = /* @__PURE__ */ new Map(),
    src_default = new Proxy(
        {},
        {
            get(_, name) {
                let tagName = (0, import_humps.decamelize)(name, { separator: '-' });
                return (
                    tags.has(name) ||
                        tags.set(name, (props) =>
                            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                                ReactShadow,
                                {
                                    Container: tagName,
                                    ...props,
                                },
                                void 0,
                                !1,
                                {
                                    fileName: 'src/index.tsx',
                                    lineNumber: 32,
                                    columnNumber: 24,
                                },
                                this
                            )
                        ),
                    tags.get(name)
                );
            },
        }
    );

// app/routes/index.tsx
var import_jsx_dev_runtime = require('react/jsx-dev-runtime');
function Home() {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        src_default.section,
        {
            className: 'weather',
            children: 'Hii',
        },
        void 0,
        !1,
        {
            fileName: 'app/routes/index.tsx',
            lineNumber: 8,
            columnNumber: 9,
        },
        this
    );
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = {
    version: 'c55cd18b',
    entry: {
        module: '/build/entry.client-T2TLZAGK.js',
        imports: [
            '/build/_shared/chunk-IMF64WG6.js',
            '/build/_shared/chunk-S64AOWX5.js',
            '/build/_shared/chunk-IE366Y5W.js',
        ],
    },
    routes: {
        root: {
            id: 'root',
            parentId: void 0,
            path: '',
            index: void 0,
            caseSensitive: void 0,
            module: '/build/root-YLZKFWWP.js',
            imports: void 0,
            hasAction: !1,
            hasLoader: !1,
            hasCatchBoundary: !1,
            hasErrorBoundary: !1,
        },
        'routes/index': {
            id: 'routes/index',
            parentId: 'root',
            path: void 0,
            index: !0,
            caseSensitive: void 0,
            module: '/build/routes/index-OGF6GQTU.js',
            imports: void 0,
            hasAction: !1,
            hasLoader: !1,
            hasCatchBoundary: !1,
            hasErrorBoundary: !1,
        },
    },
    url: '/build/manifest-C55CD18B.js',
};

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = 'public/build',
    publicPath = '/build/',
    entry = { module: entry_server_exports },
    routes = {
        root: {
            id: 'root',
            parentId: void 0,
            path: '',
            index: void 0,
            caseSensitive: void 0,
            module: root_exports,
        },
        'routes/index': {
            id: 'routes/index',
            parentId: 'root',
            path: void 0,
            index: !0,
            caseSensitive: void 0,
            module: routes_exports,
        },
    };
// Annotate the CommonJS export names for ESM import in node:
0 &&
    (module.exports = {
        assets,
        assetsBuildDirectory,
        entry,
        publicPath,
        routes,
    });
//# sourceMappingURL=index.js.map
