import { Request, RequestHandler, Response } from 'express';
import { IManagementConfig } from '../config';
import { ManagementHealth } from '../health';

export function healthRequestHandler(
  config: IManagementConfig
): RequestHandler {
  const managementHealth = new ManagementHealth();
  managementHealth.cacheFor(config.cacheDuration);
  managementHealth.addHealthChecks(config.healthChecks);

  return (req: Request, res: Response) => {
    const health = managementHealth.run();
    health.then(result => {
      const status: string = result.status;
      res.status(getReturnCode(status)).json(result);
    });
  };
}

function getReturnCode(status: string): number {
  switch (status) {
    case 'DOWN':
    case 'OUT_OF_SERVICE':
    case 'UNKNOWN':
      return 503;

    case 'COMMENT':
    case 'UP':
      return 200;
  }
}
