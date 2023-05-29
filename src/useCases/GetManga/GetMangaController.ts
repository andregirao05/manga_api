import { Request, Response } from "express";
import { IController } from "../IController";
import { badRequest, noContent, ok, serverError } from "../../helpers";
import { InvalidParamError, MangaNotFound, ServerError } from "../../errors";
import { GetMangaUseCase } from "./GetMangaUseCase";
import { getMangaValidate } from "./getMangaValidate";
import { IGetMangaDTO } from "./IGetMangaDTO";
import { ValidationError } from "yup";

export class GetMangaController implements IController {
  constructor(private readonly getMangaUseCase: GetMangaUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const validData = getMangaValidate.validateSync(
        request.params
      ) as IGetMangaDTO;
      const results = await this.getMangaUseCase.execute(validData);
      return ok(response, results);
    } catch (error) {
      console.log(error);

      if (error instanceof MangaNotFound) {
        return noContent(response);
      }

      if (error instanceof ValidationError) {
        return badRequest(response, error);
      }

      return serverError(response, new ServerError("Unexpected Error"));
    }
  }
}
