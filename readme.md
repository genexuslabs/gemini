![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)
[![CircleCI](https://circleci.com/gh/genexuslabs/gemini.svg?style=svg&circle-token=b1db9c6dddcdbd45eb9e9dcf24e888f9c0d956b1)](https://circleci.com/gh/genexuslabs/gemini)
[![Netlify Status](https://api.netlify.com/api/v1/badges/7935c6df-a07b-4eb7-bd7e-0ddc9f1da9f6/deploy-status)](https://app.netlify.com/sites/gx-gemini/deploys)

# Gemini Design System

A design system for GeneXus IDEs (GeneXus M and GeneXus for Windows).

[Here](https://share.goabstract.com/5d9855b3-43b6-4815-9c65-360e405a25c8) you can find an overview of palette, typography, styles, and components.

You can try the design system components [here](https://gx-gemini.netlify.com/).

## Getting Started

```bash
npm install
npm start
```

## Running the tests

To run the unit tests for the custom elements, run:

```bash
npm test
```

## Building for production

To build the design for production, run:

```bash
npm run build
```

## Using this design system

### Script tag

- Put a script tag similar to this `<script src='https://unpkg.com/@genexus/gemini/dist/gemini.js'></script>` in the head of your index.html
- Put a link tag similar to this `<link href="https://unpkg.com/@genexus/gemini/dist/gemini/gemini.css" rel="stylesheet" />` in the head of your index.html
- Then you can start using the layout editor in your template, JSX, html etc.

### Node Modules

- Run `npm install @genexus/gemini --save`
- Put a script tag similar to this `<script src='node_modules/@genexus/gemini/dist/gemini.js'></script>` in the head of your index.html
- Put a link tag similar to this `<link href="node_modules/@genexus/gemini/dist/gemini/gemini.css" rel="stylesheet" />` in the head of your index.html
- Then you can start using the layout editor in your template, JSX, html etc.

### Dark Theme

- Simply add the <code>dark</code> class to the <code>html</code> tag.

### Right to left reading direction

- Gemini also works with "right to left" reading direction languages. Just set the <code>dir</code> attribute value to <code>rtl</code> on the <code>html</code> tag.

## Using this design system with Stencil

### Install Gemini

1. `npm install @genexus/gemini --save`
2. Install the SASS plugin for Stencil: `npm install @stencil/sass --save-dev`
3. Edit `stencil.config.ts` as explained [here](https://github.com/ionic-team/stencil-sass).
4. Also, add `globalStyle` in `stencil.config.ts` pointing to `src/globals/global.scss`

The `stencil.config.ts` file should look something like this:

```
import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";

export const config: Config = {
   namespace: "project-name",
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
         serviceWorker: null
      }
   ],
   globalStyle: "src/globals/global.scss",
   plugins: [sass()]
};
```

5. Create the `global.scss` file under `src/globals`.
6. Add an import to Gemini's stylesheet inside `global.scss`:

`@import "../../node_modules/@genexus/gemini/dist/gemini/gemini.css";`

7. Add an import to Gemini's JavaScript file inside `src/index.ts`: `import "@genexus/gemini";`
8. After defining a globalStyle in point 4, your components library will output a CSS file. You must include this CSS file in your `src/index.html` file. The name of the stylesheet will be the same as the project name:
   `<link rel="stylesheet" href="/build/project-name.css" />`
9. Done! You can now consume Gemini's web components and use its CSS variables: `<gxg-button>Button</gxg-button>`

## Authors

See the list of [contributors](https://github.com/genexuslabs/gemini/contributors) who participated in this project.

## License

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
