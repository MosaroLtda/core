/* eslint-disable no-console */
import express, { Express, NextFunction, Request, Response } from 'express';
import { IModuleWithVersion } from '../../src/index';
import expressRoutesAdapter from '../adapters/expressRoutesAdapter';

const middlewareLogRequest = (req: Request, res: Response, next: NextFunction) => {
  const { httpVersion, method } = req;

  const url = req.url.split('?')[0];

  res.on('finish', function () {
    console.log(`HTTP/${httpVersion} -> ${url} - status: ${this.statusCode} (${method})`);
  });

  next();
};

export class Server {
  app: Express;

  constructor(modulesInstance: IModuleWithVersion[]) {
    if (!modulesInstance) {
      throw new Error('modules is required to initialize the http server');
    }

    this.app = express();

    this.initMiddlewares();
    this.initRoutes(modulesInstance);
  }

  init() {
    const port = 3497;

    this.app.listen(port);
    console.log(`Server port: ${port}.`);
  }

  private initMiddlewares() {
    this.app.use(express.json());
    this.app.use(middlewareLogRequest);
  }

  private initRoutes(modulesInstance: IModuleWithVersion[]) {
    expressRoutesAdapter(this.app, modulesInstance);
  }
}
