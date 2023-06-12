import { IController } from "../../../protocols";
import { AddUpdateUseCase } from "./AddUpdateUseCase";
import { IAddUpdateDTO } from "./IAddUpdateDTO";
import { ServerError, UpdateAlreadyRegisteredError } from "../../../errors";
import { ValidationError } from "yup";
import { addUpdateSchema } from "./addUpdateValidate";
import { IRequest, IResponse } from "../../../protocols";
import { badRequest, conflict, ok, serverError } from "../../../helpers";

export class AddUpdateController implements IController {
  constructor(private readonly addUpdateUseCase: AddUpdateUseCase) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const validData = addUpdateSchema.validateSync(
        request.body
      ) as IAddUpdateDTO;
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
