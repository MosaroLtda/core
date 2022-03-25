"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Options = exports.Patch = exports.Delete = exports.Put = exports.Post = exports.Get = void 0;
const createRouteDecorator = (requestMethod) => {
    return (path, options) => {
        return (target, propertyKey) => {
            const routes = Reflect.getMetadata('routes', target.constructor) || [];
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
exports.Get = createRouteDecorator('get');
exports.Post = createRouteDecorator('post');
exports.Put = createRouteDecorator('put');
exports.Delete = createRouteDecorator('delete');
exports.Patch = createRouteDecorator('patch');
exports.Options = createRouteDecorator('options');
