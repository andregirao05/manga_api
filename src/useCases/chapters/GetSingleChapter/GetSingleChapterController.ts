import { IController } from "protocols";
import { badRequest, notFound, ok, serverError } from "helpers";
import { DataNotFoundError, ServerError, ValidationError } from "errors";
import { GetSingleChapterUseCase } from "./GetSingleChapterUseCase";
import { IRequest, IResponse } from "protocols";
import { IValidator } from "validation";
import { IGetSingleChapterDTO } from "./IGetSingleChapterDTO";

export class GetSingleChapterController implements IController {
  constructor(
    private readonly getSingleChapterUseCase: GetSingleChapterUseCase,
    private readonly validator: IValidator<IGetSingleChapterDTO>
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { id, chapterName } = await this.validator.validate(request.params);

      const results = await this.getSingleChapterUseCase.execute({
        id,
        chapterName,
      });

      return ok(results);
    } catch (error) {
      console.log(error);

      if (error instanceof DataNotFoundError) {
        return notFound(error);
      }

      if (error instanceof ValidationError) {
        return badRequest(error);
      }
      return serverError(new ServerError("Unexpected Error"));
    }
  }
}
