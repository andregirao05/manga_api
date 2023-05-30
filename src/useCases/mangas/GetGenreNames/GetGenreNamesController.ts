import { Request, Response } from "express";
import { IController } from "../../IController";
import { badRequest, ok, serverError } from "../../../helpers";
import { ServerError } from "../../../errors";
import { GetGenreNamesUseCase } from "./GetGenreNamesUseCase";
import { getGenreNamesSchema } from "./getGenreNamesValidate";
import { IGetGenreNamesDTO } from "./IGetGenreNamesDTO";
import { ValidationError } from "yup";

export class GetGenreNamesController implements IController {
  constructor(private readonly getGenreNamesUseCase: GetGenreNamesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { params } = request;

      const { language } = getGenreNamesSchema.validateSync(
        params
      ) as IGetGenreNamesDTO;
      const results = await this.getGenreNamesUseCase.execute({ language });

      return ok(response, results);
    } catch (error) {
      console.log(error);

      if (error instanceof ValidationError) {
        return badRequest(response, error);
      }

      return serverError(response, new ServerError("Unexpected Error"));
    }
  }
}
