declare module "*.json" {
    const value: any;
    export default value;
}

declare module "git-last-commit" {
    export function getLastCommit(fn: (err: any, commit: any) => void): void;
}