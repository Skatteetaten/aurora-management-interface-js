/* tslint:disable:no-console */

import { readFileSync } from 'fs';
interface IInfoBuild {
  name: string;
  artifactId: string;
  groupId: string;
  description: string;
  version: string;
}

const root = process.cwd();

export function getBuild(): IInfoBuild {
  const file = readFileSync(`${root}/package.json`);
  const pkg = JSON.parse(file.toString());
  return {
    name: pkg.name,
    artifactId: pkg.artifactId || pkg.name,
    groupId: pkg.groupId,
    description: pkg.description,
    version: pkg.version
  };
}

export function getGitProperties(): any {
  try {
    const file = readFileSync(`${root}/git-properties.json`);
    return JSON.parse(file.toString());
  } catch (e) {
    console.log(e);
  }

  return undefined;
}
