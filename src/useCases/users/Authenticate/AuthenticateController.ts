import {
  InvalidPasswordError,
  ServerError,
  UserNotFoundError,
  ValidationError,
} from "errors";
import { badRequest, notFound, ok, serverError } from "helpers";
import { IController, IRequest, IResponse } from "protocols";
import { AuthenticateUseCase } from "./AuthenticateUseCase";
import { IAuthenticateDTO } from "./IAuthenticateDTO";
import { IValidator } from "validation";

export class AuthenticateController implements IController {
  constructor(
    private readonly authenticateUseCase: AuthenticateUseCase,
    private readonly validator: IValidator<IAuthenticateDTO>
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const validData = await this.validator.validate(request.body);
      const results = await this.authenticateUseCase.execute(validData);

      return ok(results);
    } catch (error) {
      console.log(error);

      if (error instanceof UserNotFoundError) {
        return notFound(error);
      }

      if (error instanceof InvalidPasswordError) {
        return badRequest(error);
      }

      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      return serverError(new ServerError("Unexpected Error"));
    }
  }
}
