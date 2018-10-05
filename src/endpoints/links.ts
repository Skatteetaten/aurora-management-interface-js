import { Request, RequestHandler, Response, Router } from 'express';

interface ILinkInfo {
  [index: string]: { href: string };
}

export const linksRequestHandler = (router: Router): RequestHandler => {
  return (req: Request, res: Response) => {
    res.json({
      _links: getRoutes(router, req)
    });
  };
};

const getRoutes = (router: Router, req: Request): ILinkInfo[] => {
  const ref = req.protocol + '://' + req.headers.host;
  const self = req.route.path;

  return router.stack.reduce((result: ILinkInfo, it) => {
    const path = it.route.path;
    const rel = path === self ? 'self' : path.replace('/', '');
    const href = ref + path;
    result[rel] = { href };
    return result;
  }, {});
};
