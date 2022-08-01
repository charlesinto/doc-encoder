import { Config } from '@stencil/core';
import dotEnvPlugin from 'rollup-plugin-dotenv';
// https://stenciljs.com/docs/config
const dev: boolean = process.argv && process.argv.indexOf('--dev') > -1;
const apiEnv: string = dev ? 'dev' : 'prod';

export const config: Config = {
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  env: {
    apiEnv: apiEnv
  },
  outputTargets: [
    {
      type: 'www',
      // comment the following line to disable service workers in production
      serviceWorker: null,
      baseUrl: 'https://myapp.local/',
    },
  ],
  plugins: [
    dotEnvPlugin()
  ]
};
