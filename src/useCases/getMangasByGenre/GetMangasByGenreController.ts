import { Request, Response } from "express";
import { Controller } from "../../protocols/Controller";
import { verifyRequiredParams } from "../verifyRequiredParams";
import { badRequest, noContent, ok, serverError } from "../../helpers";
import { MissingParamError, ServerError } from "../../errors";
import { GetMangasByGenreUseCase } from "./GetMangasByGenreUseCase";

export class GetMangasByGenreController implements Controller {
  constructor(
    private readonly getMangasByGenreUseCase: GetMangasByGenreUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const missingParams = verifyRequiredParams(request.params, ["genreName"]);

      if (missingParams.length > 0)
        return badRequest(response, new MissingParamError(`${missingParams.join(", ")}`));

      const { genreName } = request.params;

      const mangas = await this.getMangasByGenreUseCase.execute({ genreName });

      if (mangas.length === 0)
        return noContent(response)

      return ok(response, { mangas });
    } catch (error) {
      console.log(error);
      return serverError(response, new ServerError(""));
    }
  }
}
