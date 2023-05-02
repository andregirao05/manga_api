import { IDatabase } from "../database/interfaces";
import { IManga } from "../entities";
import { MangaNotFound, MissingParamError, ServerError } from "../errors";
import { notFound, ok, serverError, badRequest, noContent } from "../helpers";
import { Controller, HttpRequest, HttpResponse } from "../protocols";

export class GetMangaController implements Controller<any, any> {
  constructor(private readonly database: IDatabase) {}

  public async handle(request: HttpRequest<any>): Promise<HttpResponse<any>> {
    try {
      const requiredFields = ["id"];

      for (const field of requiredFields) {
        if (!request.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const { id } = request.body;

      if (!(await this.database.exists(id))) {
        return noContent(new MangaNotFound(id));
      }

      const manga = await this.database.get(id);
      return ok(manga);
    } catch (error) {
      return serverError(new ServerError("Error"));
    }
  }
}
