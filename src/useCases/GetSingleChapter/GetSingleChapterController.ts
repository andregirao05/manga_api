import { Request, Response } from "express";
import { IController } from "../IController";
import { badRequest, noContent, ok, serverError } from "../../helpers";
import { MangaNotFound, ServerError } from "../../errors";
import { GetSingleChapterUseCase } from "./GetSingleChapterUseCase";
import { ValidationError } from "yup";

export class GetSingleChapterController implements IController {
  constructor(
    private readonly getSingleChapterUseCase: GetSingleChapterUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id, chapterName } = request.params;

      const results = await this.getSingleChapterUseCase.execute({
        id,
        chapterName,
      });

      return ok(response, results);
    } catch (error) {
      console.log(error);

      if (error instanceof MangaNotFound) {
        return noContent(response);
      }

      if (error instanceof ValidationError) {
        return badRequest(response, error);
      }
      return serverError(response, new ServerError("Unexpected Error"));
    }
  }
}
