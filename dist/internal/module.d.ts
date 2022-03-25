import { HttpRoute } from '../interfaces';
import { IModule, IModuleWithVersion } from '../interfaces/module';
export declare function createModule(moduleInstance: IModule): IModule;
export declare const addVersionOnRoutes: (appModules: IModule[], version: string) => IModuleWithVersion[];
export declare const parseModuleControllerRoutes: (moduleInstance: IModule) => HttpRoute[];
