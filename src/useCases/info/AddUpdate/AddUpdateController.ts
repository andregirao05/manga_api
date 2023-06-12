import { IController, IRequest, IResponse } from "protocols";
import { AddUpdateUseCase } from "./AddUpdateUseCase";
import { IAddUpdateDTO } from "./IAddUpdateDTO";
import {
  ServerError,
  UpdateAlreadyRegisteredError,
  ValidationError,
} from "errors";
import { badRequest, conflict, ok, serverError } from "helpers";
import { IValidator } from "validation";

export class AddUpdateController implements IController {
  constructor(
    private readonly addUpdateUseCase: AddUpdateUseCase,
    private readonly validator: IValidator<IAddUpdateDTO>
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const validData = await this.validator.validate(request.body);
      const results = await this.addUpdateUseCase.execute(validData);

      return ok(results);
    } catch (error) {
      console.log(error);

      if (error instanceof UpdateAlreadyRegisteredError) {
        return conflict(error);
      }

      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      return serverError(new ServerError("Unexpected error"));
    }
  }
}
