import { IController } from "protocols";
import { badRequest, notFound, ok, serverError } from "helpers";
import { MangaNotFoundError, ServerError, ValidationError } from "errors";
import { GetMangaUseCase } from "./GetMangaUseCase";
import { IGetMangaDTO } from "./IGetMangaDTO";
import { IRequest, IResponse } from "protocols";
import { IValidator } from "validation";

export class GetMangaController implements IController {
  constructor(
    private readonly getMangaUseCase: GetMangaUseCase,
    private readonly validator: IValidator<IGetMangaDTO>
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const validData = await this.validator.validate(request.params);
      const results = await this.getMangaUseCase.execute(validData);

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
