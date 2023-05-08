import { IDatabase } from "../database/interfaces";
import { DataNotFoundError, InvalidParamError, ServerError } from "../errors";
import { ok, serverError, noContent, badRequest } from "../helpers";
import { Controller, HttpRequest, HttpResponse } from "../protocols";

export class SearchMangasController implements Controller<any, any> {
  constructor(
    private readonly database: IDatabase,
    private readonly acceptedOrigins: string[]
  ) {}

  public async handle(request: HttpRequest<any>): Promise<HttpResponse<any>> {
    try {
      const { origin, searchTerm } = request.body;

      if (!this.acceptedOrigins.includes(origin)) {
        return badRequest(new InvalidParamError("origin"));
      }

      const mangas = await this.database.search(origin, searchTerm);

      if (!mangas) {
        return noContent(new DataNotFoundError("Any data"));
      }

      return ok({ mangas });
    } catch (error) {
      console.log(error);
      return serverError(new ServerError("Error"));
    }
  }
}
