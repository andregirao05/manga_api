import { IDatabase } from "../database/interfaces";
import {
  DataNotFoundError,
  InvalidParamError,
  MissingParamError,
  ServerError,
} from "../errors";
import { ok, serverError, badRequest, noContent } from "../helpers";
import { Controller, HttpRequest, HttpResponse } from "../protocols";

export class GetGenreNamesController implements Controller<any, any> {
  constructor(
    private readonly database: IDatabase,
    private readonly languagesAccepted: string[]
  ) {}

  public async handle(request: HttpRequest<any>): Promise<HttpResponse<any>> {
    try {
      const requiredFields = ["language"];

      for (const field of requiredFields) {
        if (!request.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const { language } = request.body;

      if (!this.languagesAccepted.includes(language)) {
        return badRequest(new InvalidParamError("language"));
      }

      const genreNames = await this.database.listGenres(language);

      if (!genreNames) {
        return noContent(new DataNotFoundError("Genres"));
      }

      return ok({ genres: genreNames });
    } catch (error) {
      return serverError(new ServerError("Error"));
    }
  }
}
