import { IDatabase } from "../database/interfaces";
import { DataNotFoundError, InvalidParamError, ServerError } from "../errors";
import { ok, serverError, badRequest, noContent } from "../helpers";
import { Controller, HttpRequest, HttpResponse } from "../protocols";

export class GetLatestUpdatedMangasController implements Controller<any, any> {
  constructor(
    private readonly database: IDatabase,
    private readonly origins: string[]
  ) {}

  public async handle(request: HttpRequest<any>): Promise<HttpResponse<any>> {
    try {
      const { origin } = request.body;

      if (!this.origins.includes(origin)) {
        return badRequest(new InvalidParamError("origin"));
      }

      const mangas = await this.database.getLatestUpdated(origin);

      if (!mangas) {
        return noContent(new DataNotFoundError("Popular mangas"));
      }

      return ok({ mangas });
    } catch (error) {
      console.log(error);
      return serverError(new ServerError("Error"));
    }
  }
}
