import { Request, Response } from "express";
import { DataNotFoundError, ServerError } from "../../errors";
import { badRequest, notFound, ok, serverError } from "../../helpers";
import { IController } from "../IController";
import { ValidationError } from "yup";
import { MangaExistsUseCase } from "./MangaExistsUseCase";
import { IMangaExistsDTO } from "./IMangaExistsDTO";
import { mangaExistsSchema } from "./mangaExistValidate";

export class MangaExistsController implements IController {
  constructor(private readonly mangaExistsUseCase: MangaExistsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { body } = request;
      const validData = mangaExistsSchema.validateSync(body) as IMangaExistsDTO;
      const results = await this.mangaExistsUseCase.execute(validData);

      return ok(response, results);
    } catch (error) {
      console.log(error);

      if (error instanceof DataNotFoundError) {
        return notFound(response, error);
      }

      if (error instanceof ValidationError) {
        return badRequest(response, error);
      }

      return serverError(response, new ServerError("Unexpected Error"));
    }
  }
}
