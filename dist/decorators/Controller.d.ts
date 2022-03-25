import 'reflect-metadata';
import { HttpHandle } from '../interfaces/http';
export declare const Controller: (prefix?: string, httpHandleMiddleware?: HttpHandle[]) => ClassDecorator;
