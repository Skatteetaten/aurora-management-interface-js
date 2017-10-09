import * as express from "express";
import { Request, Response, Router } from "express";

import { linksRequestHandler, healthRequestHandler, infoRequestHandler } from "./endpoints";
import { checkForMissingConfig, ManagementConfig } from "./config";

export function managementMiddleware(userConfig?: ManagementConfig): Router {
    const router: Router = express.Router();
    const config = checkForMissingConfig(userConfig);

    router.get(config.endpoint, linksRequestHandler(router));
    router.get("/health", healthRequestHandler(config));
    router.get("/info", infoRequestHandler(config));

    return router;
}
