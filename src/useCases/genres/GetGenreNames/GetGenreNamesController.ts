import { IController } from "protocols";
import { badRequest, ok, serverError } from "helpers";
import { ServerError, ValidationError } from "errors";
import { GetGenreNamesUseCase } from "./GetGenreNamesUseCase";
import { IGetGenreNamesDTO } from "./IGetGenreNamesDTO";
import { IRequest, IResponse } from "protocols";
import { IValidator } from "validation";

export class GetGenreNamesController implements IController {
  constructor(
    private readonly getGenreNamesUseCase: GetGenreNamesUseCase,
    private readonly validator: IValidator<IGetGenreNamesDTO>
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { origin } = await this.validator.validate(request.params);
      const results = await this.getGenreNamesUseCase.execute({ origin });

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
