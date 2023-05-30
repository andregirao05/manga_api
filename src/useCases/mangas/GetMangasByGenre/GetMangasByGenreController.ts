import { Request, Response } from "express";
import { IController } from "../../IController";
import {
  badRequest,
  noContent,
  notFound,
  ok,
  serverError,
} from "../../../helpers";
import {
  DataNotFoundError,
  InvalidParamError,
  ServerError,
} from "../../../errors";
import { GetMangasByGenreUseCase } from "./GetMangasByGenreUseCase";
import { getMangasByGenreValidate } from "./getMangasuByGenreValidate";
import { ValidationError } from "yup";

export class GetMangasByGenreController implements IController {
  constructor(
    private readonly getMangasByGenreUseCase: GetMangasByGenreUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { params } = request;

      const { genreName, page } = getMangasByGenreValidate.validateSync(params);
      const results = await this.getMangasByGenreUseCase.execute({
        genreName,
        page: Number(page),
      });

      return ok(response, results);
    } catch (error) {
      console.log(error);

      if (error instanceof DataNotFoundError) {
        return notFound(response, error);
      }

      if (error instanceof ValidationError) {
        return badRequest(response, error);
      }

      return serverError(response, new ServerError("Unexpected Error"));
    }
  }
}
