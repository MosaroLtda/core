import { HttpOptions } from '../interfaces/http';
export declare const Get: (path: string, options?: HttpOptions) => MethodDecorator;
export declare const Post: (path: string, options?: HttpOptions) => MethodDecorator;
export declare const Put: (path: string, options?: HttpOptions) => MethodDecorator;
export declare const Delete: (path: string, options?: HttpOptions) => MethodDecorator;
export declare const Patch: (path: string, options?: HttpOptions) => MethodDecorator;
export declare const Options: (path: string, options?: HttpOptions) => MethodDecorator;
