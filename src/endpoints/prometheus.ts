import { Request, RequestHandler, Response } from 'express';
import { collectDefaultMetrics, register, Registry } from 'prom-client';
import { ManagementConfig } from '../config';

export function prometheusRequestHandler(
  config: ManagementConfig
): RequestHandler {
  const defaultMetrics = config.metrics?.defaultMetrics;
  if (defaultMetrics) {
    if (typeof defaultMetrics === 'object') {
      collectDefaultMetrics(defaultMetrics);
    } else {
      collectDefaultMetrics();
    }
  }

  const userRegisters = config.metrics?.registers ?? [];
  const mergedRegisters = Registry.merge([...userRegisters, register]);

  return (req: Request, res: Response) => {
    res.set('Content-Type', mergedRegisters.contentType);
    res.end(mergedRegisters.metrics());
  };
}
