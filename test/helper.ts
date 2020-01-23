import * as express from 'express';
import * as supertest from 'supertest';

import { IManagementConfig } from '../src/config';
import {
  managementInterface,
  collectPrometheusMetrics
} from '../src/middleware';

export function request(config?: IManagementConfig) {
  const app = express();
  collectPrometheusMetrics;
  app.use(managementInterface(config));
  return supertest(app);
}
