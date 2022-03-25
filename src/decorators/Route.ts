import { HttpMethods, HttpOptions } from '../interfaces/http';
import { RouteDefinition } from '../interfaces/module';

const createRouteDecorator = (requestMethod: HttpMethods) => {
  return (path: string, options?: HttpOptions): MethodDecorator => {
    return (target, propertyKey: string): void => {
      const routes: RouteDefinition[] = Reflect.getMetadata('routes', target.constructor) || [];

      routes.push({
        path,
        options,
        requestMethod,
        methodName: propertyKey,
      });

      Reflect.defineMetadata('routes', routes, target.constructor);
    };
  };
};

export const Get = createRouteDecorator('get');
export const Post = createRouteDecorator('post');
export const Put = createRouteDecorator('put');
export const Delete = createRouteDecorator('delete');
export const Patch = createRouteDecorator('patch');
export const Options = createRouteDecorator('options');
