#!/usr/bin/env node

import { spawnSync } from "child_process";
import * as path from "path";

const args = process.argv;
const script = args[2];
const scriptArgs = args.slice(3);

const appPath = __filename.split("/node_modules")[0];

switch (script) {
  case "git":
    {
      const aurora = spawnSync("node", [require.resolve("../scripts/" + script)].concat(appPath, scriptArgs));
      break;
    }
  default:
    {
      console.log("Not a valid command", script);
      console.log('Only "git" are available');
    }
}