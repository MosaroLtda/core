import { HttpHandleMiddleware, HttpRequest, HttpResponse } from '../../src';
import { Request, Response, NextFunction } from 'express';
import expressRequestAdapter from './expressRequestAdapter';

export default function expressMiddlewareAdapter(httpHandleMiddleware: HttpHandleMiddleware) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpResponseOrRequest = await httpHandleMiddleware(expressRequestAdapter(req));
    const httpResponse = httpResponseOrRequest as HttpResponse;
    const httpRequest = httpResponseOrRequest as HttpRequest;

    if (httpResponse && httpResponse.statusCode) {
      // if (httpResponse.error && !(httpResponse.error instanceof HttpError) && isProduction) {
      //   const { error } = httpResponse;
      //   rollbarAdapter(error, req.originalUrl, req);
      // }

      if (httpResponse.contentType) {
        res.contentType(httpResponse.contentType);
      }

      return res.status(httpResponse.statusCode).send(httpResponseOrRequest.body);
    }

    if (httpRequest) {
      const httpAttributes = ['body', 'headers', 'query', 'params', 'useragent'];

      httpAttributes.forEach((attribute) => {
        if (req[attribute]) {
          req[attribute] = { ...req[attribute], ...httpRequest[attribute] };
        } else {
          req[attribute] = httpRequest[attribute];
        }
      });
    }

    return next();
  };
}
