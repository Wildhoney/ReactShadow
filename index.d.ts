declare module "react-shadow" {
  import * as React from "react";

  type RenderElement = keyof HTMLElementTagNameMap;

  type Root = {
    [name in RenderElement]: React.ComponentType<
      React.HTMLAttributes<HTMLElementTagNameMap[name]>
    >;
  };

  const ReactShadowRoot: Root;

  export default ReactShadowRoot;
}