import { ValidationError } from "yup";
import { ServerError, UpdateNotFoundError } from "../../../errors";
import { badRequest, conflict, ok, serverError } from "../../../helpers";
import { IController } from "../../IController";
import { ISetUpdateDTO } from "./ISetUpdateDTO";
import { SetUpdateUseCase } from "./SetUpdateUseCase";
import { Request, Response } from "express";
import { setUpdateSchema } from "./setUpdateValidate";

export class SetUpdateController implements IController {
  constructor(private readonly setUpdateUseCase: SetUpdateUseCase) {}

  async handle(request: Request, response: Response) {
    try {
      const { body } = request;
      const validData = setUpdateSchema.validateSync(body) as ISetUpdateDTO;
      const results = await this.setUpdateUseCase.execute(validData);

      return ok(response, results);
    } catch (error) {
      console.log(error);

      if (error instanceof UpdateNotFoundError) {
        return conflict(response, error);
      }

      if (error instanceof ValidationError) {
        return badRequest(response, error);
      }

      return serverError(response, new ServerError("Unexpected Error"));
    }
  }
}
