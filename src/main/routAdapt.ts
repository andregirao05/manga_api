import { Request, Response, RequestHandler } from "express";
import { Controller, HttpRequest } from "../protocols";

export function adaptRoute(controller: Controller<any, any>): RequestHandler {
  return async (request: Request, response: Response) => {
    const httpRequest: HttpRequest<any> = {
      body: request.params,
    };
    const httpResponse = await controller.handle(httpRequest);
    return response.status(httpResponse.statusCode).json(httpResponse.body);
  };
}
