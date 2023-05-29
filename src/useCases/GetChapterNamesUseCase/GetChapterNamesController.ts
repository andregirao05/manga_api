import { Request, Response } from "express";
import { IController } from "../IController";
import { badRequest, noContent, ok, serverError } from "../../helpers";
import { InvalidParamError, MangaNotFound, ServerError } from "../../errors";
import { GetChapterNamesUseCase } from "./GetChapterNamesUseCase";
import { getChapterNamesSchema } from "./getChapterNamesValidate";
import { IGetChapterNamesDTO } from "./IGetChapterNamesDTO";
import { ValidationError } from "yup";

export class GetChapterNamesController implements IController {
  constructor(
    private readonly getChapterNamesUseCase: GetChapterNamesUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { params } = request;

      const validData = getChapterNamesSchema.validateSync(
        params
      ) as IGetChapterNamesDTO;
      const results = await this.getChapterNamesUseCase.execute(validData);

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
