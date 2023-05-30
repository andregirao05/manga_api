import { ValidationError } from "yup";
import { ServerError, UpdateNotFoundError } from "../../../errors";
import { badRequest, conflict, ok, serverError } from "../../../helpers";
import { IController } from "../../../protocols/IController";
import { ISetUpdateDTO } from "./ISetUpdateDTO";
import { SetUpdateUseCase } from "./SetUpdateUseCase";
import { setUpdateSchema } from "./setUpdateValidate";
import { IRequest, IResponse } from "../../../protocols";

export class SetUpdateController implements IController {
  constructor(private readonly setUpdateUseCase: SetUpdateUseCase) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { body } = request;
      const validData = setUpdateSchema.validateSync(body) as ISetUpdateDTO;
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
