import { Request, Response } from "express";
import { Controller } from "../../protocols/Controller";
import { verifyRequiredParams } from "../verifyRequiredParams";
import { badRequest, ok, serverError } from "../../helpers";
import { InvalidParamError, MissingParamError, ServerError } from "../../errors";
import { SearchMangasUseCase } from "./SearchMangasUseCase";

export class SearchMangasController implements Controller {
  constructor(
    private readonly searchMangasUseCase: SearchMangasUseCase,
    private readonly acceptedOrigins: string[]
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const missingParams = verifyRequiredParams(request.params, ["origin", "searchTerm"]);

      if (missingParams.length > 0)
        return badRequest(response, new MissingParamError(`${missingParams.join(", ")}`));

      const { origin, searchTerm } = request.params;

      if (!this.acceptedOrigins.includes(origin))
        return badRequest(response, new InvalidParamError("origin"));

      const mangas = await this.searchMangasUseCase.execute({ origin, searchTerm });

      return ok(response, { mangas });
    } catch (error) {
      console.log(error);
      return serverError(response, new ServerError(""));
    }
  }
}
