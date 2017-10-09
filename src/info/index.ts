export type ManagementInfo = {
    serviceLinks: { [index: string]: string }
    podLinks: { [index: string]: string }
    dependencies: { [index: string]: string }
    build: { [index: string]: string }
    git: { [index: string]: string }
};