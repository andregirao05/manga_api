import { IController } from "../../../protocols/IController";
import { badRequest, notFound, ok, serverError } from "../../../helpers";
import { DataNotFoundError, ServerError } from "../../../errors";
import { GetMangasByGenreUseCase } from "./GetMangasByGenreUseCase";
import { getMangasByGenreValidate } from "./getMangasuByGenreValidate";
import { ValidationError } from "yup";
import { IRequest, IResponse } from "../../../protocols";

export class GetMangasByGenreController implements IController {
  constructor(
    private readonly getMangasByGenreUseCase: GetMangasByGenreUseCase
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { params } = request;

      const { genreName, page } = getMangasByGenreValidate.validateSync(params);
      const results = await this.getMangasByGenreUseCase.execute({
        genreName,
        page: Number(page),
      });

      return ok(results);
    } catch (error) {
      console.log(error);

      if (error instanceof DataNotFoundError) {
        return notFound(error);
      }

      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      return serverError(new ServerError("Unexpected Error"));
    }
  }
}
