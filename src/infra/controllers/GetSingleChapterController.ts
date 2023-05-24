import { Request, Response } from "express";
import { IController } from "./IController";
import { verifyRequiredParams } from "../../main/utils/verifyRequiredParams";
import { badRequest, noContent, ok, serverError } from "../helpers";
import {
  DataNotFoundError,
  InvalidParamError,
  MangaNotFound,
  MissingParamError,
  ServerError,
} from "../../application/errors";
import { GetSingleChapterUseCase } from "../../application/useCases/GetSingleChapterUseCase";

export class GetSingleChapterController implements IController {
  constructor(
    private readonly getSingleChapterUseCase: GetSingleChapterUseCase,
    private readonly validateId: (id: string) => boolean
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const missingParams = verifyRequiredParams(request.params, [
        "id",
        "chapterName",
      ]);

      if (missingParams.length > 0)
        return badRequest(
          response,
          new MissingParamError(`${missingParams.join(", ")}`)
        );

      const { id, chapterName } = request.params;

      if (!this.validateId(id))
        return badRequest(response, new InvalidParamError("id"));

      const results = await this.getSingleChapterUseCase.execute({
        id,
        chapterName,
      });

      if (!results) {
        return noContent(response);
      }

      return ok(response, results);
    } catch (error) {
      console.log(error);
      return serverError(response, new ServerError("Unexpected Error"));
    }
  }
}
