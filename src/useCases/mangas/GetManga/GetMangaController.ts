import { IController } from "../../../protocols/IController";
import { badRequest, notFound, ok, serverError } from "../../../helpers";
import { MangaNotFound, ServerError } from "../../../errors";
import { GetMangaUseCase } from "./GetMangaUseCase";
import { getMangaValidate } from "./getMangaValidate";
import { IGetMangaDTO } from "./IGetMangaDTO";
import { ValidationError } from "yup";
import { IRequest, IResponse } from "../../../protocols";

export class GetMangaController implements IController {
  constructor(private readonly getMangaUseCase: GetMangaUseCase) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const validData = getMangaValidate.validateSync(
        request.query
      ) as IGetMangaDTO;
      const results = await this.getMangaUseCase.execute(validData);

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
