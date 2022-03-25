"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
require("reflect-metadata");
const Controller = (prefix = '', httpHandleMiddleware = []) => {
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
exports.Controller = Controller;
