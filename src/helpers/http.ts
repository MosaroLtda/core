import { HttpResponse } from '../interfaces/http';

export function ok(data: any, contentType?: string, headers?: any): HttpResponse {
  return {
    statusCode: 200,
    contentType,
    body: data,
    headers: headers,
  };
}

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null,
});
