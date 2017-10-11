import { resolve } from "path";
interface Packpath {
    parent(): string;
}
const packpath: Packpath = jest.genMockFromModule("packpath");

packpath.parent = () => {
    return resolve(__dirname, "../../../");
};

module.exports = packpath;
