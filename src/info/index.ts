import { readFileSync } from "fs";
import * as packpath from "packpath";
export type ManagementInfo = {
    serviceLinks: { [index: string]: string }
    podLinks: { [index: string]: string }
    dependencies: { [index: string]: string }
    build: { [index: string]: string }
    git: { [index: string]: string }
};

type InfoBuild = {
    name: string;
    artifactId: string,
    groupId: string,
    description: string;
    version: string;
};

const root = packpath.parent().split("/node_modules")[0];

export function getBuild(): InfoBuild {
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
        console.log("Could not find git-properties.json");
    }

    return undefined;
}