import { IController } from "protocols";
import { badRequest, ok, serverError } from "helpers";
import { ServerError, ValidationError } from "errors";
import { GetGenresUseCase } from "./GetGenresUseCase";
import { IGetGenresDTO } from "./IGetGenresDTO";
import { IRequest, IResponse } from "protocols";
import { IValidator } from "validation";

export class GetGenresController implements IController {
  constructor(
    private readonly getGenresUseCase: GetGenresUseCase,
    private readonly validator: IValidator<IGetGenresDTO>
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { origin } = await this.validator.validate(request.params);
      const results = await this.getGenresUseCase.execute({ origin });

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
