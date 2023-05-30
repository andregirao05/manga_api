import { Request, Response } from "express";
import { IController } from "../../IController";
import { badRequest, notFound, ok, serverError } from "../../../helpers";
import { MangaNotFound, ServerError } from "../../../errors";
import { GetChaptersUseCase } from "./GetChapterUseCase";
import { getChaptersValidate } from "./getChaptersValidate";
import { IGetChaptersDTO } from "./IGetChaptersDTO";
import { ValidationError } from "yup";

export class GetChaptersController implements IController {
  constructor(private readonly getChaptersUseCase: GetChaptersUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { params } = request;

      const validData = getChaptersValidate.validateSync(
        params
      ) as IGetChaptersDTO;
      const results = await this.getChaptersUseCase.execute(validData);

      return ok(response, results);
    } catch (error) {
      console.log(error);

      if (error instanceof MangaNotFound) {
        return notFound(response, error);
      }

      if (error instanceof ValidationError) {
        return badRequest(response, error);
      }

      return serverError(response, new ServerError("Unexpected Error"));
    }
  }
}
