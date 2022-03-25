import { HttpHandleMiddleware } from '../interfaces/http';
import { IMiddlewareRoute } from '../interfaces/module';

export const MiddlewareRoute = (middleware: HttpHandleMiddleware): MethodDecorator => {
  return (target, propertyKey: string): void => {
    const middlewaresRoutes: IMiddlewareRoute[] = Reflect.getMetadata('middlewaresRoutes', target.constructor) || [];

    middlewaresRoutes.push({
      methodName: propertyKey,
      middleware,
    });

    Reflect.defineMetadata('middlewaresRoutes', middlewaresRoutes, target.constructor);
  };
};
