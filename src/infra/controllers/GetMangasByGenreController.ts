import { Request, Response } from "express";
import { IController } from "./IController";
import { badRequest, noContent, ok, serverError } from "../helpers";
import { InvalidParamError, ServerError } from "../../application/errors";
import { GetMangasByGenreUseCase } from "../../application/useCases/GetMangasByGenreUseCase";

export class GetMangasByGenreController implements IController {
  constructor(
    private readonly getMangasByGenreUseCase: GetMangasByGenreUseCase,
    private readonly validatePage: (page: string) => boolean
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { genreName, page } = request.params;

      if (!this.validatePage(page))
        return badRequest(response, new InvalidParamError("page"));

      const results = await this.getMangasByGenreUseCase.execute({
        genreName,
        page: Number(page),
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
