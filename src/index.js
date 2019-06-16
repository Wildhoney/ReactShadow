const handler = {
    get: function(_, tagName) {
      const options = {
        tag: tagName
      };
  
      function ShadowContent({ root, children }) {
        return ReactDOM.createPortal(children, root);
      }
  
      return function ShadowRoot({ children, ...props }) {
        const [node, setNode] = React.useState(null);
        const [root, setRoot] = React.useState(null);
  
        React.useEffect(() => {
          node && setRoot(node.attachShadow({ mode: "open" }));
        }, [node]);
  
        return (
          <options.tag {...props} ref={node => setNode(node)}>
            {root && <ShadowContent root={root}>{children}</ShadowContent>}
          </options.tag>
        );
      };
    }
  };
  
  export default new Proxy({}, handler);