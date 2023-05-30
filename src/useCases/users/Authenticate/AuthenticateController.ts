import { ValidationError } from "yup";
import {
  InvalidPasswordError,
  ServerError,
  UserNotFoundError,
} from "../../../errors";
import { badRequest, notFound, ok, serverError } from "../../../helpers";
import { IController } from "../../IController";
import { AuthenticateUseCase } from "./AuthenticateUseCase";
import { IAuthenticateDTO } from "./IAuthenticateDTO";
import { authenticateSchema } from "./authenticateSchema";
import { Request, Response } from "express";

export class AuthenticateController implements IController {
  constructor(private readonly authenticateUseCase: AuthenticateUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { body } = request;
      const validData = authenticateSchema.validateSync(
        body
      ) as IAuthenticateDTO;
      const results = await this.authenticateUseCase.execute(validData);

      return ok(response, results);
    } catch (error) {
      console.log(error);

      if (error instanceof UserNotFoundError) {
        return notFound(response, error);
      }

      if (error instanceof InvalidPasswordError) {
        return badRequest(response, error);
      }

      if (error instanceof ValidationError) {
        return badRequest(response, error);
      }

      return serverError(response, new ServerError("Unexpected Error"));
    }
  }
}
