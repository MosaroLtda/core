import 'reflect-metadata';
import { HttpHandle } from '../interfaces/http';

export const Controller = (prefix = '', httpHandleMiddleware: HttpHandle[] = []): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata('prefix', prefix, target);
    Reflect.defineMetadata('controllerMiddlewares', httpHandleMiddleware, target);

    if (!Reflect.hasMetadata('routes', target)) {
      Reflect.defineMetadata('routes', [], target);
    }

    if (!Reflect.hasMetadata('providers', target)) {
      Reflect.defineMetadata('providers', [], target);
    }
  };
};
