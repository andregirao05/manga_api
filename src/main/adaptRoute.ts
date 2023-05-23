import { Request, Response, RequestHandler } from "express";
import { IController } from "../infra/controllers";

export function adaptRoute(controller: IController): RequestHandler {
  return (request: Request, response: Response) =>
    controller.handle(request, response);
}
