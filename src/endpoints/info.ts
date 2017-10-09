import { Request, Response, Router, RequestHandler } from "express";
import { ManagementInfo } from "../info";
import { ManagementConfig } from "../config";

export function infoRequestHandler(config: ManagementConfig): RequestHandler {
    const { serviceLinks, podLinks, dependencies } = config;
    return (req: Request, res: Response) => {
        res.json({
            serviceLinks,
            podLinks,
            dependencies
        });
    };
}