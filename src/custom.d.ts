declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string } 
  > | string;

}

// declare module "*.svg" {
//   const path: React.FunctionComponent<
//       React.SVGProps<SVGSVGElement> & { title?: string }>;
//   export const path;
// }

declare module "*.jpg"
declare module "*.png";
