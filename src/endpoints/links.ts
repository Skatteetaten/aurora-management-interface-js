import { Request, RequestHandler, Response, Router } from 'express';

interface LinkInfo {
  [index: string]: { href: string };
}

const getRoutes = (router: Router, req: Request): LinkInfo[] => {
  const ref = req.protocol + '://' + req.headers.host;
  const self = req.route.path;

  return router.stack.reduce((result: LinkInfo, it) => {
    const path = it.route.path;
    const rel = path === self ? 'self' : path.replace('/', '');
    const href = ref + path;
    result[rel] = { href };
    return result;
  }, {});
};

export const linksRequestHandler = (router: Router): RequestHandler => {
  return (req: Request, res: Response) => {
    res.json({
      _links: getRoutes(router, req),
    });
  };
};
