#!/usr/bin/env node

import { writeFileSync } from 'fs';
import { spawnSync } from 'child_process';

const args = process.argv;
const appPath = args[2];

type GitProperties = { [index: string]: string };

function createGitProperties(): void {
  const prettyArgs: GitProperties = {
    'commit.id': '%H',
    'commit.id.short': '%h',
    'commit.message': '%s',
    'commit.body': '%b',
    'commit.user.name': '%cn',
    'commit.user.email': '%ce',
    'commit.time': '%cI',
    'commit.ref': '%D'
  };

  const pretty = Object.keys(prettyArgs).reduce((result, key) => {
    if (result.length !== 0) {
      result += ', ';
    }
    return result + `"${key}": "${prettyArgs[key]}"`;
  }, '');

  const args = ['log', '-1', `--pretty=format:{ ${pretty} }`];
  const result = spawnSync('git', args);

  if (result.error) {
    console.log(result.error.message);
    return;
  }

  const gitProperties = JSON.parse(result.stdout.toString());
  writeFileSync(
    `${appPath}/git-properties.json`,
    JSON.stringify(gitProperties, undefined, 4)
  );
}

createGitProperties();
