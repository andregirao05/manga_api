import { IController } from "../../../protocols/IController";
import { AddChaptersUseCase } from "./AddChaptersUseCase";
import { addChaptersSchema } from "./AddChaptersValidate";
import { IAddChaptersDTO } from "./IAddChaptersDTO";
import { ValidationError } from "yup";
import {
  MangaNotFound,
  ServerError,
  ChapterAlreadyExistError,
} from "../../../errors";
import { IRequest, IResponse } from "../../../protocols";
import {
  badRequest,
  conflict,
  notFound,
  ok,
  serverError,
} from "../../../helpers";

export class AddChaptersController implements IController {
  constructor(private readonly addChaptersUseCase: AddChaptersUseCase) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { body } = request;
      const validData = addChaptersSchema.validateSync(body) as IAddChaptersDTO;
      const results = await this.addChaptersUseCase.execute(validData);

      return ok(results);
    } catch (error) {
      console.log(error);

      if (error instanceof MangaNotFound) {
        return notFound(error);
      }

      if (error instanceof ChapterAlreadyExistError) {
        return conflict(error);
      }

      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      return serverError(new ServerError("Unexpected error"));
    }
  }
}
