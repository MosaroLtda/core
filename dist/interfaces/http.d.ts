/// <reference types="node" />
export declare type HttpRequestOptions = 'body' | 'headers' | 'params' | 'query';
export declare type HttpMethods = 'get' | 'post' | 'delete' | 'options' | 'put' | 'patch';
export declare type HttpHandle = (request: HttpRequest) => HttpResponse | Promise<HttpResponse>;
export declare type HttpHandleMiddleware = (request: HttpRequest) => HttpRequest | Promise<HttpRequest> | HttpResponse | Promise<HttpResponse>;
export interface FileOptions {
    multiples?: boolean;
    reduceSize?: boolean;
}
export interface HttpOptions {
    multipart?: FileOptions | boolean;
    limit_requests?: {
        minutes: number;
        quantity: number;
        message?: string;
    };
}
export interface IHttpFile {
    mimetype: string;
    filename: string;
    buffer: Buffer;
}
export interface HttpRequest<Body = any, Params = any, Query = any, Headers = any> {
    body?: Body;
    params?: Params;
    query?: Query;
    headers?: Headers;
    file?: IHttpFile;
    files?: IHttpFile[];
    useragent?: any;
    path?: string;
    originalUrl?: string;
    definitionUrl?: string;
}
export interface HttpResponse {
    statusCode: number;
    contentType?: string;
    error?: Error;
    body?: any;
    headers?: any;
}
export interface HttpRoute {
    method: string;
    path: string;
    middlewares?: HttpHandleMiddleware[];
    handle: HttpHandle;
    options?: HttpOptions;
}
export interface IHttpClientResponse<T = any> {
    data?: T;
    headers?: {
        [header: string]: string;
    };
}
export declare type IHttpClientContentType = 'arraybuffer' | 'blob' | 'json' | 'text';
export interface IHttpClientParams {
    contentType?: IHttpClientContentType;
    body?: any;
    query?: any;
    headers?: any;
}
export interface IHttpClientParamsGet {
    contentType?: IHttpClientContentType;
    query?: any;
    headers?: any;
}
export interface IHttpClient {
    get<T>(url: string, params?: IHttpClientParamsGet): Promise<IHttpClientResponse<T>>;
    post<T>(url: string, params?: IHttpClientParams): Promise<IHttpClientResponse<T>>;
    put<T>(url: string, params?: IHttpClientParams): Promise<IHttpClientResponse<T>>;
    patch<T>(url: string, params?: IHttpClientParams): Promise<IHttpClientResponse<T>>;
    delete<T>(url: string, params?: IHttpClientParams): Promise<IHttpClientResponse<T>>;
}
export {};
