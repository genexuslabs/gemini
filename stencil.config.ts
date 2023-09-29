import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";

export const config: Config = {
  namespace: "gemini",
  outputTargets: [
    {
      type: "dist",
      esmLoaderPath: "../loader",
      copy: [{ src: "globals/mixins.scss" }, { src: "globals/ch-styles.css" }],
    },
    {
      type: "docs-readme",
    },
    {
      type: "www",
      serviceWorker: null, // disable service workers
      copy: [
        { src: "assets" },
        { src: "pages" },
        { src: "globals/ch-styles.css" },
      ],
    },
  ],
  globalStyle: "src/globals/global.scss",
  globalScript: "src/globals/global.js",
  plugins: [sass()],
};
