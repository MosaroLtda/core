import { HttpResponse } from '../interfaces/http';
export declare function ok(data: any, contentType?: string, headers?: any): HttpResponse;
export declare const noContent: () => HttpResponse;
