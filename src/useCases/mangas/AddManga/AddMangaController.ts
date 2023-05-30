import { Request, Response } from "express";
import { MangaAlreadyExist, ServerError } from "../../../errors";
import { badRequest, conflict, ok, serverError } from "../../../helpers";
import { IController } from "../../IController";
import { AddMangaUseCase } from "./AddMangaUseCase";
import { ValidationError } from "yup";
import { IAddMangaDTO } from "./IAddMangaDTO";
import { addMangaSchema } from "./addMangaValidate";

export class AddMangaController implements IController {
  constructor(private readonly addMangaUseCase: AddMangaUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { body } = request;
      const validData = addMangaSchema.validateSync(body) as IAddMangaDTO;
      const results = await this.addMangaUseCase.execute(validData);

      return ok(response, results);
    } catch (error) {
      console.log(error);

      if (error instanceof MangaAlreadyExist) {
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
