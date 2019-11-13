import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";
import { inlineSvg } from "stencil-inline-svg";

export const config: Config = {
  namespace: "gemini",
  outputTargets: [
    {
      type: "dist",
      esmLoaderPath: "../loader"
    },
    {
      type: "docs-readme"
    },
    {
      type: "www",
      serviceWorker: null, // disable service workers
      copy: [{ src: "assets" }]
    }
  ],
  globalStyle: "src/globals/global.scss",
  plugins: [sass(), inlineSvg()]
};
