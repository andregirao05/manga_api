import { Request, Response } from "express";
import { Controller } from "../../protocols/Controller";
import { verifyRequiredParams } from "../verifyRequiredParams";
import { badRequest, noContent, ok, serverError } from "../../helpers";
import { DataNotFoundError, InvalidParamError, MissingParamError, ServerError } from "../../errors";
import { GetChaptersUseCase } from "./GetChapterUseCase";

export class GetChaptersController implements Controller {
  constructor(
    private readonly getChaptersUseCase: GetChaptersUseCase,
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

      const chapters = await this.getChaptersUseCase.execute({ id });

      if (!chapters) {
        return noContent(response, new DataNotFoundError(`Chapter of manga with id ${id}`))
      }

      return ok(response, { chapters});
    } catch (error) {
      console.log(error);
      return serverError(response, new ServerError(""));
    }
  }
}
