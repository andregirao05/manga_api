import { IController } from "protocols";
import { badRequest, ok, serverError } from "helpers";
import { ServerError, ValidationError } from "errors";
import { AddRecommendationsUseCase } from "./AddRecommendationsUseCase";
import { IRequest, IResponse } from "protocols";
import { IValidator } from "validation";
import { IAddRecommendationsDTO } from "./IAddRecommendationsDTO";

export class AddRecommendationsController implements IController {
  constructor(
    private readonly addRecommendationsUseCase: AddRecommendationsUseCase,
    private readonly validator: IValidator<IAddRecommendationsDTO>
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { origin, ids } = await this.validator.validate(request.body);

      const results = await this.addRecommendationsUseCase.execute({
        origin,
        ids,
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
