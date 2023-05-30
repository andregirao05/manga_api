import { DataNotFoundError, ServerError } from "../../../errors";
import { badRequest, notFound, ok, serverError } from "../../../helpers";
import { IController } from "../../../protocols/IController";
import { ValidationError } from "yup";
import { MangaExistsUseCase } from "./MangaExistsUseCase";
import { IMangaExistsDTO } from "./IMangaExistsDTO";
import { mangaExistsSchema } from "./mangaExistValidate";
import { IRequest, IResponse } from "../../../protocols";

export class MangaExistsController implements IController {
  constructor(private readonly mangaExistsUseCase: MangaExistsUseCase) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const validData = mangaExistsSchema.validateSync(request.body) as IMangaExistsDTO;
      const results = await this.mangaExistsUseCase.execute(validData);

      return ok(results);
    } catch (error) {
      console.log(error);

      if (error instanceof DataNotFoundError) {
        return notFound(error);
      }

      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      return serverError(new ServerError("Unexpected Error"));
    }
  }
}
