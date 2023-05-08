import { IDatabase } from "../database/interfaces";
import { InvalidParamError, MangaNotFound, ServerError } from "../errors";
import { ok, serverError, badRequest, noContent } from "../helpers";
import { Controller, HttpRequest, HttpResponse } from "../protocols";
import { ObjectId } from "mongodb";

export class GetMangaController implements Controller<any, any> {
  constructor(private readonly database: IDatabase) {}

  public async handle(request: HttpRequest<any>): Promise<HttpResponse<any>> {
    try {
      const { id } = request.body;

      if (!ObjectId.isValid(id)) {
        return badRequest(new InvalidParamError("id"));
      }

      if (!(await this.database.exists(id))) {
        return noContent(new MangaNotFound(id));
      }

      const manga = await this.database.get(id);
      return ok(manga);
    } catch (error) {
      console.log(error);
      return serverError(new ServerError("Error"));
    }
  }
}
