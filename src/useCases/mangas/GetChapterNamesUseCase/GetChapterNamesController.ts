import { IController } from "../../../protocols/IController";
import { MangaNotFound, ServerError } from "../../../errors";
import { GetChapterNamesUseCase } from "./GetChapterNamesUseCase";
import { getChapterNamesSchema } from "./getChapterNamesValidate";
import { IGetChapterNamesDTO } from "./IGetChapterNamesDTO";
import { ValidationError } from "yup";
import { IRequest, IResponse } from "../../../protocols";
import { badRequest, notFound, ok, serverError } from "../../../helpers";

export class GetChapterNamesController implements IController {
  constructor(
    private readonly getChapterNamesUseCase: GetChapterNamesUseCase
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {

      const validData = getChapterNamesSchema.validateSync(
        request.query
      ) as IGetChapterNamesDTO;
      const results = await this.getChapterNamesUseCase.execute(validData);

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
