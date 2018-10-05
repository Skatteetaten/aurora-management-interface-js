import * as express from 'express';
import { Router } from 'express';

import {
  applyDefaultConfigToMissingProperties,
  IManagementConfig
} from './config';
import {
  envRequestHandler,
  healthRequestHandler,
  infoRequestHandler,
  linksRequestHandler
} from './endpoints';

export function managementInterface(userConfig?: IManagementConfig): Router {
  const router: Router = express.Router();
  const config = applyDefaultConfigToMissingProperties(userConfig);

  router.get(config.endpoint, linksRequestHandler(router));
  router.get('/health', healthRequestHandler(config));
  router.get('/info', infoRequestHandler(config));
  router.get('/env', envRequestHandler(config.environmentVariables));

  return router;
}
