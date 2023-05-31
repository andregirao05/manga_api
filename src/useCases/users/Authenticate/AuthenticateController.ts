import { ValidationError } from "yup";
import {
  InvalidPasswordError,
  ServerError,
  UserNotFoundError,
} from "../../../errors";
import { badRequest, notFound, ok, serverError } from "../../../helpers";
import { IController } from "../../../protocols/IController";
import { AuthenticateUseCase } from "./AuthenticateUseCase";
import { IAuthenticateDTO } from "./IAuthenticateDTO";
import { authenticateSchema } from "./authenticateSchema";
import { IRequest, IResponse } from "../../../protocols";

export class AuthenticateController implements IController {
  constructor(private readonly authenticateUseCase: AuthenticateUseCase) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const validData = authenticateSchema.validateSync(
        request.body
      ) as IAuthenticateDTO;
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
