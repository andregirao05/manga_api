import { DataNotFoundError, ServerError, ValidationError } from "errors";
import { badRequest, notFound, ok, serverError } from "helpers";
import { IController } from "protocols";
import { MangaExistsUseCase } from "./MangaExistsUseCase";
import { IMangaExistsDTO } from "./IMangaExistsDTO";
import { IRequest, IResponse } from "protocols";
import { IValidator } from "validation";

export class MangaExistsController implements IController {
  constructor(
    private readonly mangaExistsUseCase: MangaExistsUseCase,
    private readonly validator: IValidator<IMangaExistsDTO>
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const validData = await this.validator.validate(request.body);
      const results = await this.mangaExistsUseCase.execute(validData);

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
