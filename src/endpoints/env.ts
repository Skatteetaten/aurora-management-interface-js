import { Request, Response, Router, RequestHandler } from 'express';

export function envRequestHandler(): RequestHandler {
  return (req: Request, res: Response) => {
    const env = Object.keys(process.env)
      .sort()
      .reduce((result: any, key: string) => {
        result[key] = process.env[key];
        return result;
      }, {});

    res.json(env);
  };
}
