import { Request, Response, Router, RequestHandler } from 'express';
import { ManagementInfo, getBuild, getGitProperties } from '../info';
import { ManagementConfig } from '../config';

export function infoRequestHandler(config: ManagementConfig): RequestHandler {
  const { serviceLinks, podLinks, dependencies } = config;
  const build = getBuild();
  const git = getGitProperties();
  return (req: Request, res: Response) => {
    res.json({
      serviceLinks,
      podLinks,
      dependencies,
      build,
      git
    });
  };
}
