import { IController } from "../../../protocols/IController";
import { badRequest, ok, serverError } from "../../../helpers";
import { ServerError } from "../../../errors";
import { GetPopularMangasUseCase } from "./GetPopularMangasUseCase";
import { getPopularMangasSchema } from "./getPopularMangasValidate";
import { ValidationError } from "yup";
import { IRequest, IResponse } from "../../../protocols";

export class GetPopularMangasController implements IController {
  constructor(
    private readonly getPopularMangasUseCase: GetPopularMangasUseCase
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { origin, page } = getPopularMangasSchema.validateSync(request.query);

      const results = await this.getPopularMangasUseCase.execute({
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
