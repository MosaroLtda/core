import { resolve } from 'path';
import { Server } from './server';
import { IModule, importModulesFromDirectory, addVersionOnRoutes } from '../src';

const appModules = importModulesFromDirectory<IModule>(resolve(__dirname, 'modules'), {
  fileNameIncludes: '.module',
});

const server = new Server(addVersionOnRoutes(appModules, 'v1'));

server.init();
