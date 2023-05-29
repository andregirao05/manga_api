import { ValidationError } from "yup";
import { ServerError, UpdateNotFoundError } from "../../errors";
import { badRequest, notFound, ok, serverError } from "../../helpers";
import { IController } from "../IController";
import { GetUpdateUseCase } from "./GetUpdateUseCase";
import { IGetUpdateDTO } from "./IGetUpdateDTO";
import { Request, Response } from "express";
import { getUpdateSchema } from "./getUpdateValidate";

export class GetUpdateController implements IController {
  constructor(private readonly getUpdateUseCase: GetUpdateUseCase) {}

  async handle(request: Request, response: Response) {
    try {
      const { params } = request;
      const validData = getUpdateSchema.validateSync(params) as IGetUpdateDTO;
      const results = await this.getUpdateUseCase.execute(validData);

      return ok(response, results);
    } catch (error) {
      console.log(error);

      if (error instanceof UpdateNotFoundError) {
        return notFound(response, error);
      }

      if (error instanceof ValidationError) {
        return badRequest(response, error);
      }

      return serverError(response, new ServerError("Unexpected Error"));
    }
  }
}
