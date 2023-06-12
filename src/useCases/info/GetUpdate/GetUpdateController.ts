import { ServerError, UpdateNotFoundError, ValidationError } from "errors";
import { badRequest, notFound, ok, serverError } from "helpers";
import { IController } from "protocols";
import { GetUpdateUseCase } from "./GetUpdateUseCase";
import { IGetUpdateDTO } from "./IGetUpdateDTO";
import { IRequest, IResponse } from "protocols";
import { IValidator } from "validation";

export class GetUpdateController implements IController {
  constructor(
    private readonly getUpdateUseCase: GetUpdateUseCase,
    private readonly validator: IValidator<IGetUpdateDTO>
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { origin } = await this.validator.validate(request.params);
      const results = await this.getUpdateUseCase.execute({
        origin,
      });

      return ok(results);
    } catch (error) {
      console.log(error);

      if (error instanceof UpdateNotFoundError) {
        return notFound(error);
      }

      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      return serverError(new ServerError("Unexpected Error"));
    }
  }
}
