import { Request, Response } from "express";
import { IController } from "../IController";
import { badRequest, noContent, ok, serverError } from "../../helpers";
import { InvalidParamError, ServerError } from "../../errors";
import { SearchMangasUseCase } from "./SearchMangasUseCase";

export class SearchMangasController implements IController {
  constructor(
    private readonly searchMangasUseCase: SearchMangasUseCase,
    private readonly acceptedOrigins: string[],
    private readonly validatePage: (page: string) => boolean
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { origin, searchTerm, page } = request.params;

      if (!this.acceptedOrigins.includes(origin))
        return badRequest(response, new InvalidParamError("origin"));

      if (!this.validatePage(page))
        return badRequest(response, new InvalidParamError("page"));

      const results = await this.searchMangasUseCase.execute({
        origin,
        searchTerm,
        page: Number(page),
      });

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
