#!/usr/bin/env groovy
def jenkinsfile

def overrides = [
    scriptVersion  : 'v7',
    pipelineScript: 'https://git.aurora.skead.no/scm/ao/aurora-pipeline-scripts.git',
    credentialsId: "github",
    versionStrategy: [
        [ branch: 'master', versionHint: '1']
    ],
    iq: false,
    nodeVersion: "12",
    publishToNpm: true, 
    publishSnapshotToNpm: true, 
    deployToNexus: false,
    openShiftBuild: false
]

fileLoader.withGit(overrides.pipelineScript, overrides.scriptVersion) {
  jenkinsfile = fileLoader.load('templates/webleveransepakke')
}

jenkinsfile.run(overrides.scriptVersion, overrides)