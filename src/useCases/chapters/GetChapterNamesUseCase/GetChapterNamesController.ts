import { IController } from "protocols";
import { MangaNotFoundError, ServerError, ValidationError } from "errors";
import { GetChapterNamesUseCase } from "./GetChapterNamesUseCase";
import { IGetChapterNamesDTO } from "./IGetChapterNamesDTO";
import { IRequest, IResponse } from "protocols";
import { badRequest, notFound, ok, serverError } from "helpers";
import { IValidator } from "validation";

export class GetChapterNamesController implements IController {
  constructor(
    private readonly getChapterNamesUseCase: GetChapterNamesUseCase,
    private readonly validator: IValidator<IGetChapterNamesDTO>
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const validData = await this.validator.validate(request.params);
      const results = await this.getChapterNamesUseCase.execute(validData);

      return ok(results);
    } catch (error) {
      console.log(error);

      if (error instanceof MangaNotFoundError) {
        return notFound(error);
      }

      if (error instanceof ValidationError) {
        return badRequest(error);
      }
      return serverError(new ServerError("Unexpected Error"));
    }
  }
}
