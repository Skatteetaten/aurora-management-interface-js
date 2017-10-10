import { Request, Response, Router, RequestHandler } from "express";
import { ManagementInfo, getBuild } from "../info";
import { ManagementConfig } from "../config";
import * as git from "git-last-commit";

export function infoRequestHandler(config: ManagementConfig): RequestHandler {
    const { serviceLinks, podLinks, dependencies } = config;
    return (req: Request, res: Response) => {
        git.getLastCommit((err, commit) => {
            commit.authoredOn = new Date(commit.authoredOn * 1000);
            commit.committedOn = new Date(commit.committedOn * 1000);
            res.json({
                serviceLinks,
                podLinks,
                dependencies,
                build: getBuild(),
                git: commit
            });
        });
    };
}