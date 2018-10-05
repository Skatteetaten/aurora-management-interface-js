import { Request, Response, Router, RequestHandler } from 'express';

type LinkInfo = { [index: string]: { href: string } };

export const linksRequestHandler = (router: Router): RequestHandler => {
  return (req: Request, res: Response) => {
    res.json({
      _links: getRoutes(router, req)
    });
  };
};

const getRoutes = (router: Router, req: Request): Array<LinkInfo> => {
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
