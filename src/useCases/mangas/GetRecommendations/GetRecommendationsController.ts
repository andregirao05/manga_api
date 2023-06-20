import { IController } from "protocols";
import { badRequest, ok, serverError } from "helpers";
import { ServerError, ValidationError } from "errors";
import { GetRecommendationsUseCase } from "./GetRecommendationsUseCase";
import { IRequest, IResponse } from "protocols";
import { IValidator } from "validation";
import { IGetRecommendationsDTO } from "./IGetRecommendationsDTO";

export class GetRecommendationsController implements IController {
  constructor(
    private readonly getRecommendationsUseCase: GetRecommendationsUseCase,
    private readonly validator: IValidator<IGetRecommendationsDTO>
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { origin, page } = await this.validator.validate(request.params);

      const results = await this.getRecommendationsUseCase.execute({
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
