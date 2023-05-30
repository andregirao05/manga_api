import { IController } from "../../../protocols/IController";
import { MangaNotFound, ServerError } from "../../../errors";
import { GetChaptersUseCase } from "./GetChapterUseCase";
import { getChaptersValidate } from "./getChaptersValidate";
import { IGetChaptersDTO } from "./IGetChaptersDTO";
import { ValidationError } from "yup";
import { IRequest, IResponse } from "../../../protocols";
import { badRequest, notFound, ok, serverError } from "../../../helpers";

export class GetChaptersController implements IController {
  constructor(private readonly getChaptersUseCase: GetChaptersUseCase) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const validData = getChaptersValidate.validateSync(
        request.query
      ) as IGetChaptersDTO;
      const results = await this.getChaptersUseCase.execute(validData);

      return ok(results);
    } catch (error) {
      console.log(error);

      if (error instanceof MangaNotFound) {
        return notFound(error);
      }

      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      return serverError(new ServerError("Unexpected Error"));
    }
  }
}
