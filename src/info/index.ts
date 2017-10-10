import { readFileSync } from "fs";
import * as packageJson from "../../package.json";
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
    const pkg = (<any>packageJson);
    return {
        name: pkg.name,
        groupId: pkg.groupId,
        description: pkg.description,
        version: pkg.version
    };
}
