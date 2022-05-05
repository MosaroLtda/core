"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseModuleControllerRoutes = exports.addVersionOnRoutes = exports.createModule = void 0;
function createModule(moduleInstance) {
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
    const routes = Reflect.getMetadata('routes', controller);
    if (prefix === undefined || !routes) {
        throw new TypeError(`Invalid controller`);
    }
    return {
        controller,
        controllerInstance,
    };
}
exports.createModule = createModule;
const addVersionOnRoutes = (appModules, version) => {
    return appModules.map((appModule) => ({
        ...appModule,
        version: `${version || ''}`
            .split('/')
            .map(str => str.replace(new RegExp('/', 'g'), ''))
            .filter(Boolean)
            .join('/'),
    }));
};
exports.addVersionOnRoutes = addVersionOnRoutes;
const makeHttpHandleWithErrorHandling = (method, routePath, routeMethod) => {
    return async (httpRequest) => {
        try {
            const methodResponse = await method(httpRequest);
            if (!methodResponse) {
                throw new Error(`Invalid route (${routePath} - ${routeMethod.toUpperCase()}). Route does not return an HttpRequest | HttpResponse.`);
            }
            return methodResponse;
        }
        catch (error) {
            const type = error.type;
            const statusCode = error.statusCode || 500;
            const description = error.description;
            const ServerError = 'Internal Server Error';
            const message = statusCode === 500 ? ServerError : (error === null || error === void 0 ? void 0 : error.message) || ServerError;
            if (statusCode === 500)
                console.error(error);
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
const parseModuleControllerRoutes = (moduleInstance) => {
    const { controllerInstance, controller } = moduleInstance;
    const prefix = Reflect.getMetadata('prefix', controller);
    const routes = Reflect.getMetadata('routes', controller) || [];
    const middlewaresController = Reflect.getMetadata('controllerMiddlewares', controller) || [];
    const middlewaresRoutes = Reflect.getMetadata('middlewaresRoutes', controller) || [];
    return routes.map((route) => {
        const { methodName, options, path: routePath, requestMethod: method } = route;
        const middlewaresRoute = middlewaresRoutes
            .filter((middlewareRoute) => methodName === middlewareRoute.methodName)
            .map(({ middleware }) => makeHttpHandleWithErrorHandling(middleware, routePath, method));
        const middlewaresControllerSerialized = middlewaresController.map((middleware) => makeHttpHandleWithErrorHandling(middleware, routePath, method));
        const middlewares = [...middlewaresControllerSerialized, ...middlewaresRoute];
        const serializedPrefix = prefix.startsWith('/') ? prefix.replace('/', '') : prefix;
        const serializedRoutePath = routePath.startsWith('/') ? routePath.replace('/', '') : routePath;
        const path = `/${serializedPrefix}/${serializedRoutePath}`;
        const handle = makeHttpHandleWithErrorHandling(controllerInstance[methodName].bind(controllerInstance), routePath, method);
        return {
            handle,
            method,
            path,
            middlewares,
            options,
        };
    });
};
exports.parseModuleControllerRoutes = parseModuleControllerRoutes;
