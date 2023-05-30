import { Request, Response, RequestHandler } from "express";
import { IController } from "./useCases/mangas";

export function adaptRoute(controller: IController): RequestHandler {
  return (request: Request, response: Response) =>
    controller.handle(request, response);
}
