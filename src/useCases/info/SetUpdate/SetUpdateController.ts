import { ServerError, UpdateNotFoundError, ValidationError } from "errors";
import { badRequest, conflict, ok, serverError } from "helpers";
import { IController, IRequest, IResponse } from "protocols";
import { ISetUpdateDTO } from "./ISetUpdateDTO";
import { SetUpdateUseCase } from "./SetUpdateUseCase";
import { IValidator } from "validation";

export class SetUpdateController implements IController {
  constructor(
    private readonly setUpdateUseCase: SetUpdateUseCase,
    private readonly validator: IValidator<ISetUpdateDTO>
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const validData = await this.validator.validate(request.body);
      const results = await this.setUpdateUseCase.execute(validData);

      return ok(results);
    } catch (error) {
      console.log(error);

      if (error instanceof UpdateNotFoundError) {
        return conflict(error);
      }

      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      return serverError(new ServerError("Unexpected Error"));
    }
  }
}
