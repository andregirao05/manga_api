import { IController } from "../../../protocols";
import { badRequest, ok, serverError } from "../../../helpers";
import { ServerError } from "../../../errors";
import { GetGenreNamesUseCase } from "./GetGenreNamesUseCase";
import { getGenreNamesSchema } from "./getGenreNamesValidate";
import { IGetGenreNamesDTO } from "./IGetGenreNamesDTO";
import { ValidationError } from "yup";
import { IRequest, IResponse } from "../../../protocols";

export class GetGenreNamesController implements IController {
  constructor(private readonly getGenreNamesUseCase: GetGenreNamesUseCase) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { language } = getGenreNamesSchema.validateSync(
        request.params
      ) as IGetGenreNamesDTO;
      const results = await this.getGenreNamesUseCase.execute({ language });

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
