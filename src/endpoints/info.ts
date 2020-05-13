import { Request, RequestHandler, Response } from 'express';
import { ManagementConfig } from '../config';
import { getBuild, getGitProperties } from '../info';

export function infoRequestHandler(config: ManagementConfig): RequestHandler {
  const { serviceLinks, podLinks, dependencies } = config;
  const build = getBuild();
  const git = getGitProperties();
  return (req: Request, res: Response) => {
    res.json({
      build,
      dependencies,
      git,
      podLinks,
      serviceLinks,
    });
  };
}
