import { IController } from "protocols";
import { badRequest, notFound, ok, serverError } from "helpers";
import { DataNotFoundError, ServerError, ValidationError } from "errors";
import { GetMangasByGenreUseCase } from "./GetMangasByGenreUseCase";
import { IRequest, IResponse } from "protocols";
import { IValidator } from "validation";
import { IGetMangasByGenreDTO } from "./IGetMangasByGenreDTO";

export class GetMangasByGenreController implements IController {
  constructor(
    private readonly getMangasByGenreUseCase: GetMangasByGenreUseCase,
    private readonly validator: IValidator<IGetMangasByGenreDTO>
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { origin, genreName, page } = await this.validator.validate(
        request.params
      );
      const results = await this.getMangasByGenreUseCase.execute({
        origin,
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
