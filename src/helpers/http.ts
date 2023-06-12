import { IResponse } from "protocols";

export function ok(data: any): IResponse<any> {
  return {
    statusCode: 200,
    data: data,
    error: null,
  };
}

export function noContent(): IResponse<any> {
  return {
    statusCode: 204,
    data: null,
    error: null,
  };
}

export function badRequest(error: Error): IResponse<any> {
  return {
    statusCode: 400,
    data: null,
    error: error.message,
  };
}

export function conflict(error: Error): IResponse<any> {
  return {
    statusCode: 409,
    data: null,
    error: error.message,
  };
}

export function notFound(error: Error): IResponse<any> {
  return {
    statusCode: 404,
    data: null,
    error: error.message,
  };
}

export function serverError(error: Error): IResponse<any> {
  return {
    statusCode: 500,
    data: null,
    error: error.message,
  };
}
