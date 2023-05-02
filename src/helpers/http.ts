import { HttpResponse } from "../protocols";

export function ok(data: any): HttpResponse<any> {
  return {
    statusCode: 200,
    body: data,
  };
}

export function noContent(error: Error | undefined): HttpResponse<any> {
  return {
    statusCode: 204,
    body: error,
  };
}

export function badRequest(data: any): HttpResponse<any> {
  return {
    statusCode: 400,
    body: data,
  };
}

export function notFound(data: any): HttpResponse<any> {
  return {
    statusCode: 404,
    body: data,
  };
}

export function serverError(error: Error | undefined): HttpResponse<any> {
  return {
    statusCode: 500,
    body: error,
  };
}
