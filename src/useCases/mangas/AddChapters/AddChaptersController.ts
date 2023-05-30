import { Request, Response } from "express";
import { IController } from "../../IController";
import { AddChaptersUseCase } from "./AddChaptersUseCase";
import { addChaptersSchema } from "./AddChaptersValidate";
import { IAddChaptersDTO } from "./IAddChaptersDTO";
import {
  badRequest,
  conflict,
  noContent,
  notFound,
  ok,
  serverError,
} from "../../../helpers";
import { ValidationError } from "yup";
import {
  MangaNotFound,
  ServerError,
  ChapterAlreadyExistError,
} from "../../../errors";

export class AddChaptersController implements IController {
  constructor(private readonly addChaptersUseCase: AddChaptersUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { body } = request;
      const validData = addChaptersSchema.validateSync(body) as IAddChaptersDTO;
      const results = await this.addChaptersUseCase.execute(validData);

      return ok(response, results);
    } catch (error) {
      console.log(error);

      if (error instanceof MangaNotFound) {
        return notFound(response, error);
      }

      if (error instanceof ChapterAlreadyExistError) {
        return conflict(response, error);
      }

      if (error instanceof ValidationError) {
        console.log(error.name);
        return badRequest(response, error);
      }

      return serverError(response, new ServerError("Unexpected Error"));
    }
  }
}
