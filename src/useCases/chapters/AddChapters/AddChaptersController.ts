import { IController, IRequest, IResponse } from "protocols";
import { AddChaptersUseCase } from "./AddChaptersUseCase";
import { IAddChaptersDTO } from "./IAddChaptersDTO";
import {
  MangaNotFoundError,
  ServerError,
  ChapterAlreadyExistError,
  ValidationError,
} from "errors";
import { badRequest, conflict, notFound, ok, serverError } from "helpers";
import { IValidator } from "validation";

export class AddChaptersController implements IController {
  constructor(
    private readonly addChaptersUseCase: AddChaptersUseCase,
    private readonly validator: IValidator<IAddChaptersDTO>
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const validData = await this.validator.validate(request.body);
      const results = await this.addChaptersUseCase.execute(validData);

      return ok(results);
    } catch (error) {
      console.log(error);

      if (error instanceof MangaNotFoundError) {
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
