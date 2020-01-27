import { Request, RequestHandler, Response } from 'express';
import { register } from 'prom-client';

export function prometheusRequestHandler(): RequestHandler {
  return (req: Request, res: Response) => {
    res.set('Content-Type', 'text/plain');
    res.end(register.metrics());
  };
}
