import { resolve } from 'path';
import { Server } from './server';
import { IModule, importModulesFromDirectory } from '../src';

const appModules = importModulesFromDirectory<IModule>(resolve(__dirname, 'modules'), {
  fileNameIncludes: '.module',
});

const server = new Server(appModules);

server.init();
