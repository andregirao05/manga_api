import { Request, Response, RequestHandler } from "express";
import { IController, IRequest } from "./protocols";

export function adaptRoute(controller: IController<any>): RequestHandler {
  return async (request: Request, response: Response) => {
    const hhtpRequest: IRequest = {
      body: request.body,
      headers: request.headers,
      query: request.query,
      params: request.params,
    };

    const { statusCode, data, error } = await controller.handle(hhtpRequest);

    return response.status(statusCode).json({
      data,
      error,
    });
  };
}
