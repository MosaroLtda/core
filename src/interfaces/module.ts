import { HttpHandleMiddleware, HttpMethods, HttpOptions } from './http';

export interface IModule {
  controller: Function;
  controllerInstance: object;
}

export interface IModuleWithVersion extends IModule {
  version?: string;
}

export interface RouteDefinition {
  path: string;
  requestMethod: HttpMethods;
  methodName: string;
  options: HttpOptions;
}

export interface IMiddlewareRoute {
  methodName: string;
  middleware: HttpHandleMiddleware;
}
