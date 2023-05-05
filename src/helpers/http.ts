import { HttpResponse } from "../protocols";

export function ok(data: any): HttpResponse<any> {
  return {
    statusCode: 200,
    body: data,
  };
}

export function noContent(data: any): HttpResponse<any> {
  return {
    statusCode: 204,
    body: data,
  };
}

export function badRequest(error: Error | undefined): HttpResponse<any> {
  return {
    statusCode: 400,
    body: error,
  };
}

export function notFound(error: Error | undefined): HttpResponse<any> {
  return {
    statusCode: 404,
    body: error,
  };
}

export function serverError(error: Error | undefined): HttpResponse<any> {
  return {
    statusCode: 500,
    body: error,
  };
}
