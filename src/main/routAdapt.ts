import { Request, Response, RequestHandler } from "express";
import { Controller, HttpRequest } from "../protocols";

export function adaptRoute(controller: Controller<any, any>): RequestHandler {
  return async (request: Request, response: Response) => {
    const httpRequest: HttpRequest<any> = {
      body: request.params,
    };
    const { statusCode, body } = await controller.handle(httpRequest);

    if (statusCode === 200) {
      response.status(statusCode).json(body);
    } else {
      response.status(statusCode).json({
        error: body.message,
      });
    }
  };
}
