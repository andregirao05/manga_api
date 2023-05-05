import { IDatabase } from "../database/interfaces";
import { DataNotFoundError, MissingParamError, ServerError } from "../errors";
import { ok, serverError, badRequest, noContent } from "../helpers";
import { Controller, HttpRequest, HttpResponse } from "../protocols";

export class GerMangasByGenreController implements Controller<any, any> {
  constructor(private readonly database: IDatabase) {}

  public async handle(request: HttpRequest<any>): Promise<HttpResponse<any>> {
    try {
      const requiredFields = ["genreName"];

      for (const field of requiredFields) {
        if (!request.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const { genreName } = request.body;

      const mangas = await this.database.getMangasByGenre(genreName);

      if (!mangas) {
        return noContent(
          new DataNotFoundError(`Mangas of genge \"${genreName}\"`)
        );
      }

      return ok({ mangas });
    } catch (error) {
      return serverError(new ServerError("Error"));
    }
  }
}
