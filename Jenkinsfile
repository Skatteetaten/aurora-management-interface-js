#!/usr/bin/env groovy

def scriptVersion = 'v3.5.0'
def jenkinsfile
fileLoader.withGit('https://git.aurora.skead.no/scm/ao/aurora-pipeline-scripts.git', scriptVersion) {
   jenkinsfile = fileLoader.load('templates/webleveransepakke')
}

def overrides = [
  publishToNpm: true, 
  deployToNexus: false,
  openShiftBuild: false
]

jenkinsfile.run(scriptVersion, overrides)