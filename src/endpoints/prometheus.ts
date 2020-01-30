import { Request, RequestHandler, Response } from 'express';
import { register, collectDefaultMetrics, Registry } from 'prom-client';
import { IManagementConfig } from '../config';

export function prometheusRequestHandler(
  config: IManagementConfig
): RequestHandler {
  const defaultMetrics = config.metrics?.defaultMetrics;
  if (defaultMetrics) {
    if (typeof defaultMetrics !== 'boolean') {
      collectDefaultMetrics(defaultMetrics);
    } else {
      collectDefaultMetrics();
    }
  }

  const userRegisters = config.metrics?.registers ?? [];
  const mergedRegisters = Registry.merge([...userRegisters, register]);

  return (req: Request, res: Response) => {
    res.set('Content-Type', 'text/plain');
    res.end(mergedRegisters.metrics());
  };
}
