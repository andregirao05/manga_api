import { IController } from "protocols";
import { badRequest, ok, serverError } from "helpers";
import { ServerError, ValidationError } from "errors";
import { GetLatestUpdatedMangasUseCase } from "./GetLatestUpdatedMangasUseCase";
import { IRequest, IResponse } from "protocols";
import { IValidator } from "validation";
import { IGetLatestUpdatedMangasDTO } from "./IGetLatestUpdatedMangasDTO";

export class GetLatestUpdatedMangasController implements IController {
  constructor(
    private readonly getLatestUpdatedMangasUseCase: GetLatestUpdatedMangasUseCase,
    private readonly validator: IValidator<IGetLatestUpdatedMangasDTO>
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { origin, page } = await this.validator.validate(request.params);

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
