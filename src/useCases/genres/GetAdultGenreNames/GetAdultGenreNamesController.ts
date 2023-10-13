import { IController } from "protocols";
import { badRequest, ok, serverError } from "helpers";
import { ServerError, ValidationError } from "errors";
import { GetAdultGenreNamesUseCase } from "./GetAdultGenreNamesUseCase";
import { IGetAdultGenreNamesDTO } from "./IGetAdultGenreNamesDTO";
import { IRequest, IResponse } from "protocols";
import { IValidator } from "validation";

export class GetAdultGenreNamesController implements IController {
  constructor(
    private readonly getAdultGenreNamesUseCase: GetAdultGenreNamesUseCase,
    private readonly validator: IValidator<IGetAdultGenreNamesDTO>
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { origin } = await this.validator.validate(request.params);
      const results = await this.getAdultGenreNamesUseCase.execute({ origin });

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
