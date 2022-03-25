"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlewareRoute = void 0;
const MiddlewareRoute = (middleware) => {
    return (target, propertyKey) => {
        const middlewaresRoutes = Reflect.getMetadata('middlewaresRoutes', target.constructor) || [];
        middlewaresRoutes.push({
            methodName: propertyKey,
            middleware,
        });
        Reflect.defineMetadata('middlewaresRoutes', middlewaresRoutes, target.constructor);
    };
};
exports.MiddlewareRoute = MiddlewareRoute;
