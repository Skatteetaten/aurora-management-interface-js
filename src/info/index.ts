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
    groupId: string,
    description: string;
    version: string;
};

export function getBuild(): InfoBuild {
    const pkg = require(`${packpath.self()}/package.json`);
    return {
        name: pkg.name,
        groupId: pkg.groupId,
        description: pkg.description,
        version: pkg.version
    };
}
