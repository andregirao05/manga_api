import { Request, Response, RequestHandler } from "express";
import { Controller } from "../protocols";

export function adaptRoute(controller: Controller): RequestHandler {
  return (request: Request, response: Response) =>
    controller.handle(request, response);
}
