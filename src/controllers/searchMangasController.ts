import { IDatabase } from "../database/interfaces";
import { DataNotFoundError, MissingParamError, ServerError } from "../errors";
import { ok, serverError, badRequest, noContent, notFound } from "../helpers";
import { Controller, HttpRequest, HttpResponse } from "../protocols";

export class SearchMangasController implements Controller<any, any> {
  constructor(private readonly database: IDatabase) {}

  public async handle(request: HttpRequest<any>): Promise<HttpResponse<any>> {
    try {
      const requiredFields = ["searchTerm"];

      for (const field of requiredFields) {
        if (!request.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

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
