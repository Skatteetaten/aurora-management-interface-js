#!/usr/bin/env node
/* tslint:disable:no-console */

import { spawnSync } from 'child_process';

const args = process.argv;
const script = args[2];
const scriptArgs = args.slice(3);

const appPath = process.cwd();

switch (script) {
  case 'git': {
    spawnSync(
      'node',
      [require.resolve('../scripts/' + script)].concat(appPath, scriptArgs)
    );
    break;
  }
  default: {
    console.log('Not a valid command', script);
    console.log('Only "git" are available');
  }
}
