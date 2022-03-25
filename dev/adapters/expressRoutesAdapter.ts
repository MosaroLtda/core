import { Express, Request, Response } from 'express';
import expressMiddlewareAdapter from './expressMiddlewareAdapter';
import expressRequestAdapter from './expressRequestAdapter';
import { parseModuleControllerRoutes, IModuleWithVersion, FileOptions, HttpResponse } from '../../src/index';

export default function setupRoutes(app: Express, modulesInstance = []) {
  modulesInstance.forEach((moduleInstance: IModuleWithVersion) => {
    const { version = '' } = moduleInstance;
    const routes = parseModuleControllerRoutes(moduleInstance);

    routes.forEach((route) => {
      const { handle, method, path, options, middlewares = [] } = route;

      const middlewaresExpress = middlewares.map(expressMiddlewareAdapter);

      // add suport to multipart/form
      // if (options?.multipart) {
      //   const multipart = options?.multipart as FileOptions;

      //   if (multipart?.reduceSize) {
      //     const storage = multerStorage.storageMemory;
      //     const middleware: any = multipart.multiplesFile ? storage.array('files') : storage.single('file');

      //     const middlewareAfter = async (req: Request, _: Response, next: NextFunction) => {
      //       const { buffer } = req.file;
      //       const pathDir = multipart?.filePublic ? PUBLIC_FILES_LOCAL_PATH : PRIVATE_FILES_LOCAL_PATH;

      //       const hash = await hashFileName();

      //       const filename = `${hash}.webp`;
      //       const mimeType = 'image/webp';

      //       await sharp(buffer).webp({ quality: 20 }).toFile(resolve(pathDir, filename));

      //       req.file.filename = filename;
      //       req.file.mimetype = mimeType as string;

      //       next();
      //     };

      //     middlewaresExpress.push(middleware);
      //     middlewaresExpress.push(middlewareAfter);
      //   } else {
      //     const storage = multipart?.filePublic ? multerStorage.storagePublic : multerStorage.storagePrivate;
      //     const middleware: any = multipart.multiplesFile ? storage.array('files') : storage.single('file');

      //     middlewaresExpress.push(middleware);
      //   }
      // }

      // if (options?.limit_requests) {
      //   const errorResponse = {
      //     status: 'Error',
      //     message: options?.limit_requests?.message || 'Limite de requisições excedidas!',
      //     type: 'MAX_REQUESTS',
      //   };

      //   const rateLimitMiddleware = rateLimit({
      //     windowMs: options.limit_requests.minutes * 60 * 1000,
      //     max: options.limit_requests.quantity, // limit each IP
      //     message: errorResponse as any,
      //   });

      //   middlewaresExpress.push(rateLimitMiddleware as any);
      // }

      const expressHandle = async (req: Request, res: Response) => {
        const httpRequest = expressRequestAdapter(req);

        const promise = handle(httpRequest);

        const httpResponse = await promise;

        // if (httpResponse?.error && isProduction) {
        //   const { error } = httpResponse;
        //   rollbarAdapter(error, req.originalUrl, req);
        // }

        if (httpResponse?.contentType) {
          res.contentType(httpResponse.contentType);
        }

        if (httpResponse?.headers && typeof httpResponse?.headers === 'object') {
          const headersToExpose = Object.keys(httpResponse.headers).reduce((acm, header) => {
            const value = httpResponse.headers[header];

            res.header(header, value);
            return acm ? `${acm},${header}` : header;
          }, '');

          res.header('Access-Control-Expose-Headers', headersToExpose);
        }

        res.status(httpResponse.statusCode).send(httpResponse.body);
      };

      const pathSplit = `${version}/${path}`.split('/');

      const pathSerialized = pathSplit
        .map((str) => str.replace(new RegExp('/', 'g'), ''))
        .filter(Boolean)
        .join('/');

      app[method](`/${pathSerialized}`, ...middlewaresExpress, expressHandle);
    });
  });
}
