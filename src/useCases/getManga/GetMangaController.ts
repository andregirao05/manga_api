import { Request, Response } from "express";
import { Controller } from "../../protocols/Controller";
import { GetMangaUseCase } from "./GetMangaUseCase";
import { verifyRequiredParams } from "../verifyRequiredParams";
import { badRequest, noContent, ok, serverError } from "../../helpers";
import { InvalidParamError, MangaNotFound, MissingParamError, ServerError } from "../../errors";

export class GetMangaController implements Controller {
  constructor(
    private readonly getMangaUseCase: GetMangaUseCase,
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

      const manga = await this.getMangaUseCase.execute({ id });

      if (!manga) {
        return noContent(response, new MangaNotFound(id))
      }

      return ok(response, manga);
    } catch (error) {
      console.log(error);
      return serverError(response, new ServerError(""));
    }
  }
}
