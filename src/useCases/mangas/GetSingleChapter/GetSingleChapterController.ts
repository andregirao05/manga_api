import { IController } from "../../../protocols/IController";
import { badRequest, notFound, ok, serverError } from "../../../helpers";
import { MangaNotFound, ServerError } from "../../../errors";
import { GetSingleChapterUseCase } from "./GetSingleChapterUseCase";
import { ValidationError } from "yup";
import { IRequest, IResponse } from "../../../protocols";

export class GetSingleChapterController implements IController {
  constructor(
    private readonly getSingleChapterUseCase: GetSingleChapterUseCase
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { id, chapterName } = request.query;

      const results = await this.getSingleChapterUseCase.execute({
        id,
        chapterName,
      });

      return ok(results);
    } catch (error) {
      console.log(error);

      if (error instanceof MangaNotFound) {
        return notFound(error);
      }

      if (error instanceof ValidationError) {
        return badRequest(error);
      }
      return serverError(new ServerError("Unexpected Error"));
    }
  }
}
