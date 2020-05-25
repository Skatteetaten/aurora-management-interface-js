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
        // Enabling metrics for all tests will make every test register default
        // metrics for the global registry and will end up failing. We could
        // clear register before each test, but instead we only enable metrics
        // when we want to test prometheus endpoint.
        enabled: false,
      },
      ...config,
    })
  );
  return supertest(app);
}
