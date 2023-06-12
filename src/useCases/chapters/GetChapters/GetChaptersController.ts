import { IController } from "protocols";
import { MangaNotFoundError, ServerError, ValidationError } from "errors";
import { GetChaptersUseCase } from "./GetChapterUseCase";
import { IGetChaptersDTO } from "./IGetChaptersDTO";
import { IRequest, IResponse } from "protocols";
import { badRequest, notFound, ok, serverError } from "helpers";
import { IValidator } from "validation";

export class GetChaptersController implements IController {
  constructor(
    private readonly getChaptersUseCase: GetChaptersUseCase,
    private readonly validator: IValidator<IGetChaptersDTO>
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const validData = await this.validator.validate(request.params);
      const results = await this.getChaptersUseCase.execute(validData);

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
