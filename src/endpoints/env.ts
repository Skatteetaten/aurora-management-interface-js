import { Request, RequestHandler, Response } from 'express';

const DEFAULT_SUFFIX_MASK = ['password', 'secret', 'key'];

function maskProperty(key: string, value: string): string {
  const keyLowerCase = key.toLowerCase();
  const keyMatchMaskSuffix = DEFAULT_SUFFIX_MASK.filter((maskSuffix) =>
    keyLowerCase.endsWith(maskSuffix)
  );
  if (keyMatchMaskSuffix.length === 0) {
    return value;
  }

  return '*'.repeat(10);
}

export function envRequestHandler(envs: any): RequestHandler {
  return (req: Request, res: Response) => {
    const env = Object.keys(envs)
      .sort()
      .map((key) => ({
        [key]: maskProperty(key, envs[key]),
      }))
      .reduce(
        (result, pair) => ({
          ...result,
          ...pair,
        }),
        {}
      );

    res.json(env);
  };
}
