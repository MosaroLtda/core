import { HttpRequest } from '../../src';
import { Request } from 'express';

export default function expressRequestAdapter(req: Request): HttpRequest {
  return {
    headers: req.headers,
    body: req.body,
    params: req.params,
    query: req.query,
    useragent: null,
    file: null,
    files: null,
  };
}
