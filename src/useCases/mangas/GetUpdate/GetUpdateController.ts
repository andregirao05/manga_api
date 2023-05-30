import { ValidationError } from "yup";
import { ServerError, UpdateNotFoundError } from "../../../errors";
import { badRequest, notFound, ok, serverError } from "../../../helpers";
import { IController } from "../../../protocols/IController";
import { GetUpdateUseCase } from "./GetUpdateUseCase";
import { IGetUpdateDTO } from "./IGetUpdateDTO";
import { getUpdateSchema } from "./getUpdateValidate";
import { IRequest, IResponse } from "../../../protocols";

export class GetUpdateController implements IController {
  constructor(private readonly getUpdateUseCase: GetUpdateUseCase) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const validData = getUpdateSchema.validateSync(request.query) as IGetUpdateDTO;
      const results = await this.getUpdateUseCase.execute(validData);

      return ok(results);
    } catch (error) {
      console.log(error);

      if (error instanceof UpdateNotFoundError) {
        return notFound(error);
      }

      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      return serverError(new ServerError("Unexpected Error"));
    }
  }
}
