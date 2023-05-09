import { Request, Response } from "express";
import { Controller } from "../../protocols/Controller";
import { verifyRequiredParams } from "../verifyRequiredParams";
import { badRequest, ok, serverError } from "../../helpers";
import { InvalidParamError, MissingParamError, ServerError } from "../../errors";
import { GetGenreNamesUseCase } from "./GetGenreNamesUseCase";

export class GetGenreNamesController implements Controller {
  constructor(
    private readonly getGenreNamesUseCase: GetGenreNamesUseCase,
    private readonly acceptedLanguages: string[]
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const missingParams = verifyRequiredParams(request.params, ["language"]);

      if (missingParams.length > 0)
        return badRequest(response, new MissingParamError(`${missingParams.join(", ")}`));

      const { language } = request.params;

      if (!this.acceptedLanguages.includes(language))
        return badRequest(response, new InvalidParamError("language"))

      const genres = await this.getGenreNamesUseCase.execute({ language });

      return ok(response, { genres });
    } catch (error) {
      console.log(error);
      return serverError(response, new ServerError(""));
    }
  }
}
