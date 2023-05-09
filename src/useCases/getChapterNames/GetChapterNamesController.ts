import { Request, Response } from "express";
import { Controller } from "../../protocols/Controller";
import { verifyRequiredParams } from "../verifyRequiredParams";
import { badRequest, noContent, ok, serverError } from "../../helpers";
import { DataNotFoundError, InvalidParamError, MissingParamError, ServerError } from "../../errors";
import { GetChapterNamesUseCase } from "./GetChapterNamesUseCase";

export class GetChapterNamesController implements Controller {
  constructor(
    private readonly getChapterNamesUseCase: GetChapterNamesUseCase,
    private readonly validateId: (id: string) => boolean
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const missingParams = verifyRequiredParams(request.params, ["id"]);

      if (missingParams.length > 0)
        return badRequest(response, new MissingParamError(`${missingParams.join(", ")}`));

      const { id } = request.params;

      if (!this.validateId(id))
        return badRequest(response, new InvalidParamError("id"));

      const chapterNames = await this.getChapterNamesUseCase.execute({ id });

      if (!chapterNames) {
        return noContent(response, new DataNotFoundError(`Chapters of manga with id ${id}`))
      }

      return ok(response, { chapterNames });
    } catch (error) {
      console.log(error);
      return serverError(response, new ServerError(""));
    }
  }
}
