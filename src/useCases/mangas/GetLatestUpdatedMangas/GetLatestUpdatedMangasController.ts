import { IController } from "../../../protocols/IController";
import { badRequest, ok, serverError } from "../../../helpers";
import { ServerError } from "../../../errors";
import { GetLatestUpdatedMangasUseCase } from "./GetLatestUpdatedMangasUseCase";
import { getLatestUpdatedMangasSchema } from "./getLatestUpdatedMangasValidate";
import { ValidationError } from "yup";
import { IRequest, IResponse } from "../../../protocols";

export class GetLatestUpdatedMangasController implements IController {
  constructor(
    private readonly getLatestUpdatedMangasUseCase: GetLatestUpdatedMangasUseCase
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {

      const { origin, page } =
        getLatestUpdatedMangasSchema.validateSync(request.params);

      const results = await this.getLatestUpdatedMangasUseCase.execute({
        origin,
        page,
      });

      return ok(results);
    } catch (error) {
      console.log(error);

      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      return serverError(new ServerError("Unexpected Error"));
    }
  }
}
