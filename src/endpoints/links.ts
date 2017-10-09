import { Request, Response, Router, RequestHandler } from "express";

type LinkInfo = {
    rel: string;
    href: string;
};

export const linksRequestHandler = (router: Router): RequestHandler => {
    return (req: Request, res: Response) => {
        res.send({
            links: getRoutes(router, req)
        });
    };
};

const getRoutes = (router: Router, req: Request): Array<LinkInfo> => {
    const ref = req.protocol + "://" + req.headers.host;
    const self = req.route.path;

    return router.stack.map(it => {
        const path = it.route.path;
        const rel = (path === self) ? "self" : path.replace("/", "");
        const href = ref + path;
        return {
            rel,
            href,
        };
    });
};
