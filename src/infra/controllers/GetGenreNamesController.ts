import { Request, Response } from "express";
import { IController } from "./IController";
import { badRequest, noContent, ok, serverError } from "../helpers";
import { InvalidParamError, ServerError } from "../errors";
import { GetGenreNamesUseCase } from "../../application/useCases/GetGenreNamesUseCase";

export class GetGenreNamesController implements IController {
  constructor(
    private readonly getGenreNamesUseCase: GetGenreNamesUseCase,
    private readonly acceptedLanguages: string[]
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { language } = request.params;

      if (!this.acceptedLanguages.includes(language))
        return badRequest(response, new InvalidParamError("language"));

      const results = await this.getGenreNamesUseCase.execute({ language });

      if (!results) {
        return noContent(response);
      }

      return ok(response, results);
    } catch (error) {
      console.log(error);
      return serverError(response, new ServerError("Unexpected Error"));
    }
  }
}
