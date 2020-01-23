import { Request, RequestHandler, Response } from 'express';
import { register } from 'prom-client';

export function metricsRequestHandler(): RequestHandler {
  return (req: Request, res: Response) => {
    res.set('Content-Type', 'text/plain');
    res.json({ metrics: register.metrics() });
  };
}
