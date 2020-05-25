import * as express from 'express';
import { Router } from 'express';

import {
  applyDefaultConfigToMissingProperties,
  ManagementConfig,
} from './config';
import {
  envRequestHandler,
  healthRequestHandler,
  infoRequestHandler,
  linksRequestHandler,
  prometheusRequestHandler,
} from './endpoints';

export function managementInterface(userConfig?: ManagementConfig): Router {
  const router: Router = express.Router();
  const config = applyDefaultConfigToMissingProperties(userConfig);

  router.get(config.endpoint, linksRequestHandler(router));
  router.get('/health', healthRequestHandler(config));
  router.get('/info', infoRequestHandler(config));
  router.get('/env', envRequestHandler(config.environmentVariables));

  if (config.metrics?.enabled) {
    router.get('/prometheus', prometheusRequestHandler(config));
  }

  return router;
}
