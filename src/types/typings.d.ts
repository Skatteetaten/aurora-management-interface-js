declare module "*.json" {
    const value: any;
    export default value;
}

declare module "packpath" {
    export function self(): string;
    export function parent(): string;
}