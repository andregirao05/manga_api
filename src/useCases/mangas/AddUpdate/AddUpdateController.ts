import { Request, Response } from "express";
import { IController } from "../../IController";
import { AddUpdateUseCase } from "./AddUpdateUseCase";
import { IAddUpdateDTO } from "./IAddUpdateDTO";
import { badRequest, conflict, ok, serverError } from "../../../helpers";
import { ServerError, UpdateAlreadyRegisteredError } from "../../../errors";
import { ValidationError } from "yup";
import { addUpdateSchema } from "./addUpdateValidate";

export class AddUpdateController implements IController {
  constructor(private readonly addUpdateUseCase: AddUpdateUseCase) {}

  async handle(request: Request, response: Response) {
    try {
      const { body } = request;
      const validData = addUpdateSchema.validateSync(body) as IAddUpdateDTO;
      const results = await this.addUpdateUseCase.execute(validData);

      return ok(response, results);
    } catch (error) {
      console.log(error);

      if (error instanceof UpdateAlreadyRegisteredError) {
        return conflict(response, error);
      }

      if (error instanceof ValidationError) {
        return badRequest(response, error);
      }

      return serverError(response, new ServerError("Unexpected Error"));
    }
  }
}
