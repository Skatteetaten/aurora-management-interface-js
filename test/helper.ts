import express from 'express';
import supertest from 'supertest';
import { SuperTest, Test } from 'supertest';

import { ManagementConfig } from '../src/config';
import { managementInterface } from '../src/middleware';

export function request(config?: ManagementConfig): SuperTest<Test> {
  const app = express();
  app.use(
    managementInterface({
      metrics: {
        enabled: false,
      },
      ...config,
    })
  );
  return supertest(app);
}
