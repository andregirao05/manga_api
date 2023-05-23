import { Request, Response, RequestHandler } from "express";
import { Controller } from "../infra/controllers";

export function adaptRoute(controller: Controller): RequestHandler {
  return (request: Request, response: Response) =>
    controller.handle(request, response);
}
