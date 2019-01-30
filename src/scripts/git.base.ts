/* tslint:disable:no-console */

import { spawnSync } from 'child_process';
import { writeFileSync } from 'fs';

const args = process.argv;
const appPath = args[2];

interface IGitProperties {
  [index: string]: string;
}

interface ICreateGitPropertiesOption {
  writeToDisk: boolean;
}

export function createGitProperties(
  options: ICreateGitPropertiesOption
): any | undefined {
  const prettyArgs: IGitProperties = {
    'commit.id': '%H',
    'commit.id.short': '%h',
    'commit.message': '%s',
    'commit.body': '%b',
    'commit.user.name': '%cn',
    'commit.user.email': '%ce',
    'commit.time': '%cI',
    'commit.ref': '%D',
    'commit.time/v1': '%ci',
    'commit.ref/v1': '%d'
  };

  const pretty = Object.keys(prettyArgs).reduce((acc, key) => {
    if (acc.length !== 0) {
      acc += ', ';
    }
    return acc + `"${key}": "${prettyArgs[key]}"`;
  }, '');

  const gitArguments = ['log', '-1', `--pretty=format:{ ${pretty} }`];
  const result = spawnSync('git', gitArguments);

  if (result.error) {
    console.log(result.error.message);
    return;
  }

  const gitProperties = JSON.parse(result.stdout.toString());
  if (options.writeToDisk) {
    writeFileSync(
      `${appPath}/git-properties.json`,
      JSON.stringify(gitProperties, undefined, 4)
    );
  }

  return gitProperties;
}
