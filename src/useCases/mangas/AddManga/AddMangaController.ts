import { MangaAlreadyExist, ServerError } from "../../../errors";
import { IController } from "../../../protocols/IController";
import { AddMangaUseCase } from "./AddMangaUseCase";
import { ValidationError } from "yup";
import { IAddMangaDTO } from "./IAddMangaDTO";
import { addMangaSchema } from "./addMangaValidate";
import { IRequest, IResponse } from "../../../protocols";
import { badRequest, conflict, ok, serverError } from "../../../helpers";

export class AddMangaController implements IController {
  constructor(private readonly addMangaUseCase: AddMangaUseCase) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { body } = request;
      const validData = addMangaSchema.validateSync(body) as IAddMangaDTO;
      const results = await this.addMangaUseCase.execute(validData);

      return ok(results);
    } catch (error) {
      console.log(error);

      if (error instanceof MangaAlreadyExist) {
        return conflict(error);
      }

      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      return serverError(new ServerError("Unexpected Error"));
    }
  }
}
