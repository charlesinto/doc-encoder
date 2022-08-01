import { Env } from '@stencil/core';


/**
 *
 */
const resources = {
  dev: {
    BASE_URL: `http://localhost:8005`,
    ENCRYPT_DOC: '/api/v1/cia/document/upload/encrypt'
  },
  prod: {
    user: `http://localhost:8005`,
    ENCRYPT_DOC: '/api/v1/cia/document/upload/encrypt'
  }
};

export const apis = resources[Env.apiEnv];
