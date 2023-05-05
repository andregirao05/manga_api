import { IDatabase } from "../database/interfaces";
import { DataNotFoundError, ServerError } from "../errors";
import { ok, serverError, noContent } from "../helpers";
import { Controller, HttpRequest, HttpResponse } from "../protocols";

export class GerMangasByGenreController implements Controller<any, any> {
  constructor(private readonly database: IDatabase) {}

  public async handle(request: HttpRequest<any>): Promise<HttpResponse<any>> {
    try {
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
