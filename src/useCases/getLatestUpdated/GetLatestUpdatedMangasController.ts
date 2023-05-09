import { Request, Response } from "express";
import { Controller } from "../../protocols/Controller";
import { verifyRequiredParams } from "../verifyRequiredParams";
import { badRequest, ok, serverError } from "../../helpers";
import { InvalidParamError, MissingParamError, ServerError } from "../../errors";
import { GetLatestUpdatedMangasUseCase } from "./GetLatestUpdatedMangasUseCase";

export class GetLatestUpdatedMangasController implements Controller {
  constructor(
    private readonly getLatestUpdatedMangasUseCase: GetLatestUpdatedMangasUseCase,
    private readonly acceptedOrigins: string[]
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const missingParams = verifyRequiredParams(request.params, ["origin"]);

      if (missingParams.length > 0)
        return badRequest(response, new MissingParamError(`${missingParams.join(", ")}`));

      const { origin } = request.params;

      if (!this.acceptedOrigins.includes(origin))
        return badRequest(response, new InvalidParamError("origin"));

      const mangas = await this.getLatestUpdatedMangasUseCase.execute({ origin });

      return ok(response, { mangas });
    } catch (error) {
      console.log(error);
      return serverError(response, new ServerError(""));
    }
  }
}
