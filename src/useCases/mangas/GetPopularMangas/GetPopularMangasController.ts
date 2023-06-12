import { IController } from "protocols";
import { badRequest, ok, serverError } from "helpers";
import { ServerError, ValidationError } from "errors";
import { GetPopularMangasUseCase } from "./GetPopularMangasUseCase";
import { IRequest, IResponse } from "protocols";
import { IValidator } from "validation";
import { IGetPopularMangasDTO } from "./IGetPopularMangasDTO";

export class GetPopularMangasController implements IController {
  constructor(
    private readonly getPopularMangasUseCase: GetPopularMangasUseCase,
    private readonly validator: IValidator<IGetPopularMangasDTO>
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { origin, page } = await this.validator.validate(request.params);

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
