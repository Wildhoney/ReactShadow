declare module "react-shadow" {
  import * as React from "react";

  type Root = {
    [name: string]: React.ComponentType;
  };

  const ReactShadowRoot: Root;

  export default ReactShadowRoot;
}