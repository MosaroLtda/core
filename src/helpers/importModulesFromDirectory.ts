/* eslint-disable @typescript-eslint/no-var-requires */
import path from 'path';
import fg from 'fast-glob';

interface IOptions {
  fileNameIncludes?: string;
  fileNameIgnore?: string;
}

export function importModulesFromDirectory<T = any>(pathModulesDirectory: string, options: IOptions = {}) {
  const { fileNameIncludes = '' } = options;

  const filePaths = fg.sync(`${pathModulesDirectory}/**/*${fileNameIncludes}.(ts|js)`, {
    cwd: path.join(pathModulesDirectory),
  });

  const modules: T[] = [];

  for (let i = 0; i < filePaths.length; i++) {
    const filePath = filePaths[i];

    try {
      const importedModule = require(filePath);

      if (!importedModule) {
        console.log(`Invalid node module to import: ${filePath}`);
      } //
      else {
        modules.push(importedModule.default || importedModule);
      }
    } catch (error) {
      console.log(`Error during import node(s) module(s) on ${filePath}`);
      console.error(error);
    }
  }

  return modules;
}

export default importModulesFromDirectory;
