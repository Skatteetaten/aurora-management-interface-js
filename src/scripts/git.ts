#!/usr/bin/env node

import { createGitProperties } from './git.base';

createGitProperties({ writeToDisk: true });
