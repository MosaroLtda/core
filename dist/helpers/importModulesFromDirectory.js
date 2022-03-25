"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importModulesFromDirectory = void 0;
const path_1 = __importDefault(require("path"));
const fast_glob_1 = __importDefault(require("fast-glob"));
function importModulesFromDirectory(pathModulesDirectory, options = {}) {
    const { fileNameIncludes = '' } = options;
    const filePaths = fast_glob_1.default.sync(`${pathModulesDirectory}/**/*${fileNameIncludes}.(ts|js)`, {
        cwd: path_1.default.join(pathModulesDirectory),
    });
    const modules = [];
    for (let i = 0; i < filePaths.length; i++) {
        const filePath = filePaths[i];
        try {
            const importedModule = require(filePath);
            if (!importedModule) {
                console.log(`Invalid node module to import: ${filePath}`);
            }
            else {
                modules.push(importedModule.default || importedModule);
            }
        }
        catch (error) {
            console.log(`Error during import node(s) module(s) on ${filePath}`);
            console.error(error);
        }
    }
    return modules;
}
exports.importModulesFromDirectory = importModulesFromDirectory;
exports.default = importModulesFromDirectory;
