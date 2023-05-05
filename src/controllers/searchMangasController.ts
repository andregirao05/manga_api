import { IDatabase } from "../database/interfaces";
import { DataNotFoundError, ServerError } from "../errors";
import { ok, serverError, noContent } from "../helpers";
import { Controller, HttpRequest, HttpResponse } from "../protocols";

export class SearchMangasController implements Controller<any, any> {
  constructor(private readonly database: IDatabase) {}

  public async handle(request: HttpRequest<any>): Promise<HttpResponse<any>> {
    try {
      const { searchTerm } = request.body;

      const mangas = await this.database.search(searchTerm);

      if (!mangas) {
        return noContent(new DataNotFoundError("Any data"));
      }

      return ok({ mangas });
    } catch (error) {
      return serverError(new ServerError("Error"));
    }
  }
}
