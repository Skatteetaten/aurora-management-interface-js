import * as express from 'express';
import { Router } from 'express';

import {
  envRequestHandler,
  linksRequestHandler,
  healthRequestHandler,
  infoRequestHandler
} from './endpoints';
import { checkForMissingConfig, ManagementConfig } from './config';

export function managementInterface(userConfig?: ManagementConfig): Router {
  const router: Router = express.Router();
  const config = checkForMissingConfig(userConfig);

  router.get(config.endpoint, linksRequestHandler(router));
  router.get('/health', healthRequestHandler(config));
  router.get('/info', infoRequestHandler(config));
  router.get('/env', envRequestHandler());

  return router;
}
