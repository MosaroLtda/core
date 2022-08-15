export type HttpRequestOptions = 'body' | 'headers' | 'params' | 'query';

export type HttpMethods = 'get' | 'post' | 'delete' | 'options' | 'put' | 'patch';

export type HttpHandle = (request: HttpRequest) => HttpResponse | Promise<HttpResponse>;

export type HttpHandleMiddleware = (
  request: HttpRequest,
) => HttpRequest | Promise<HttpRequest> | HttpResponse | Promise<HttpResponse>;

export interface FileOptions {
  multiples?: boolean;
  reduceSize?: boolean;
}

export interface HttpOptions {
  multipart?: FileOptions | boolean;
  limit_requests?: {
    minutes: number; // minutes
    quantity: number; // requests quantity per time
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

export type IHttpClientContentType = 'arraybuffer' | 'blob' | 'json' | 'text';

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
