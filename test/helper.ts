import * as express from 'express';
import * as supertest from 'supertest';

import { IManagementConfig } from '../src/config';
import { managementInterface } from '../src/middleware';

export function request(config?: IManagementConfig) {
  const app = express();
  app.use(managementInterface(config));
  return supertest(app);
}
