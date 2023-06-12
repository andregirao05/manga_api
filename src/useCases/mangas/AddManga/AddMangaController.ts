import { MangaAlreadyExistError, ServerError, ValidationError } from "errors";
import { IController } from "protocols";
import { AddMangaUseCase } from "./AddMangaUseCase";
import { IAddMangaDTO } from "./IAddMangaDTO";
import { IRequest, IResponse } from "protocols";
import { badRequest, conflict, ok, serverError } from "helpers";
import { IValidator } from "validation";

export class AddMangaController implements IController {
  constructor(
    private readonly addMangaUseCase: AddMangaUseCase,
    private readonly validator: IValidator<IAddMangaDTO>
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const validData = await this.validator.validate(request.body);
      const results = await this.addMangaUseCase.execute(validData);

      return ok(results);
    } catch (error) {
      console.log(error);

      if (error instanceof MangaAlreadyExistError) {
        return conflict(error);
      }

      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      return serverError(new ServerError("Unexpected Error"));
    }
  }
}
