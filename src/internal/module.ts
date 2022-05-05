import { HttpHandle, HttpHandleMiddleware, HttpRequest, HttpResponse, HttpRoute } from '../interfaces';
import { RouteDefinition, IMiddlewareRoute } from '../interfaces/module';
import { IModule, IModuleWithVersion } from '../interfaces/module';

export function createModule(moduleInstance: IModule): IModule {
  const { controller, controllerInstance } = moduleInstance;

  if (typeof controller !== 'function') {
    throw new TypeError('Invalid Controller');
  }

  if (typeof controllerInstance !== 'object') {
    throw new TypeError('Invalid Controller');
  }

  if (!(controllerInstance instanceof controller)) {
    throw new TypeError(`Invalid controller`);
  }

  const prefix = Reflect.getMetadata('prefix', controller);
  const routes: Array<RouteDefinition> = Reflect.getMetadata('routes', controller);

  if (prefix === undefined || !routes) {
    throw new TypeError(`Invalid controller`);
  }

  return {
    controller,
    controllerInstance,
  };
}

export const addVersionOnRoutes = (appModules: IModule[], version: string): IModuleWithVersion[] => {
  return appModules.map((appModule) => ({
    ...appModule,
    version: `${version || ''}`
      .split('/')
      .map(str => str.replace(new RegExp('/', 'g'), ''))
      .filter(Boolean)
      .join('/'),
  }));
};

const makeHttpHandleWithErrorHandling = (
  method: HttpHandle | HttpHandleMiddleware,
  routePath: string,
  routeMethod: string,
) => {
  return async (httpRequest: HttpRequest): Promise<HttpResponse | HttpRequest> => {
    try {
      const methodResponse = await method(httpRequest);

      if (!methodResponse) {
        throw new Error(
          `Invalid route (${routePath} - ${routeMethod.toUpperCase()}). Route does not return an HttpRequest | HttpResponse.`,
        );
      }

      return methodResponse;
    } catch (error) {
      const type = error.type;
      const statusCode = error.statusCode || 500;
      const description = error.description;

      const ServerError = 'Internal Server Error';
      const message = statusCode === 500 ? ServerError : error?.message || ServerError;

      if (statusCode === 500) console.error(error);

      return {
        statusCode,
        error,
        body: {
          status: 'Error',
          message,
          description,
          type,
        },
      };
    }
  };
};

export const parseModuleControllerRoutes = (moduleInstance: IModule): HttpRoute[] => {
  const { controllerInstance, controller } = moduleInstance;

  const prefix: string = Reflect.getMetadata('prefix', controller);
  const routes: RouteDefinition[] = Reflect.getMetadata('routes', controller) || [];
  const middlewaresController: HttpHandleMiddleware[] = Reflect.getMetadata('controllerMiddlewares', controller) || [];
  const middlewaresRoutes: IMiddlewareRoute[] = Reflect.getMetadata('middlewaresRoutes', controller) || [];

  return routes.map((route) => {
    const { methodName, options, path: routePath, requestMethod: method } = route;

    const middlewaresRoute = middlewaresRoutes
      .filter((middlewareRoute) => methodName === middlewareRoute.methodName)
      .map(({ middleware }) => makeHttpHandleWithErrorHandling(middleware, routePath, method));

    const middlewaresControllerSerialized = middlewaresController.map((middleware) =>
      makeHttpHandleWithErrorHandling(middleware, routePath, method),
    );

    const middlewares = [...middlewaresControllerSerialized, ...middlewaresRoute];

    const serializedPrefix = prefix.startsWith('/') ? prefix.replace('/', '') : prefix;
    const serializedRoutePath = routePath.startsWith('/') ? routePath.replace('/', '') : routePath;
    const path = `/${serializedPrefix}/${serializedRoutePath}`;

    const handle = makeHttpHandleWithErrorHandling(
      controllerInstance[methodName].bind(controllerInstance),
      routePath,
      method,
    ) as HttpHandle;

    return {
      handle,
      method,
      path,
      middlewares,
      options,
    };
  });
};
