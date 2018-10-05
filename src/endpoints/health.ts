import { Request, Response, RequestHandler } from 'express';
import { Status, ManagementHealth, HealthStatus } from '../health';
import { ManagementConfig } from '../config';

export function healthRequestHandler(config: ManagementConfig): RequestHandler {
  const managementHealth = fromConfig(config);
  return (req: Request, res: Response) => {
    const health = managementHealth.run();
    health.then(async result => {
      const status: string = result['status'];
      res.status(getReturnCode(status)).json(result);
    });
  };
}

function fromConfig(config: ManagementConfig): ManagementHealth {
  const managementHealth = new ManagementHealth();
  managementHealth.cacheFor(config.cacheDuration);

  const checks = config.healthChecks;
  Object.keys(checks).forEach(k => {
    managementHealth.addCheck(async () => {
      const result = await checks[k]();
      const { status, ...fields } = result;
      return new HealthStatus(k, Status.valueOf(status), fields);
    });
  });

  return managementHealth;
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
