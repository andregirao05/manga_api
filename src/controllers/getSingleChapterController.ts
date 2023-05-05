import { ObjectId } from "mongodb";
import { IDatabase } from "../database/interfaces";
import {
  DataNotFoundError,
  InvalidParamError,
  MangaNotFound,
  ServerError,
} from "../errors";
import { ok, serverError, badRequest, noContent } from "../helpers";
import { Controller, HttpRequest, HttpResponse } from "../protocols";

export class GetSingleChapterController implements Controller<any, any> {
  constructor(private readonly database: IDatabase) {}

  public async handle(request: HttpRequest<any>): Promise<HttpResponse<any>> {
    try {
      const { id, chapterName } = request.body;

      if (!ObjectId.isValid(id)) {
        return badRequest(new InvalidParamError("id"));
      }

      if (!(await this.database.exists(id))) {
        return noContent(new MangaNotFound(id));
      }

      const chapter = await this.database.getSingleChapter(id, chapterName);

      if (!chapter) {
        return noContent(
          new DataNotFoundError(`Chapter ${chapter} in manga with id ${id}`)
        );
      }

      return ok(chapter);
    } catch (error) {
      return serverError(new ServerError("Error"));
    }
  }
}
