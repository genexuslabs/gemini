import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'gx-geminis-ds',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [
        { src: 'assets' }
      ]
    }
  ],
  //globalStyle: 'src/globals/global.css',
  plugins: [
    sass({
      injectGlobalPaths: [
        'src/globals/general.scss',
        'src/globals/icon-moon.scss',
        'src/globals/normalize.scss',
        'src/globals/tokens-borders.scss',
        'src/globals/tokens-colors.scss',
        'src/globals/tokens-fonts.scss',
        'src/globals/tokens-outlines.scss',
        'src/globals/tokens-spacing.scss'
      ]
    })
  ]
};
