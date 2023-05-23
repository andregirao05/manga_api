import { Request, Response } from "express";
import { Controller } from "./Controller";
import { GetMangaUseCase } from "../../application/useCases/GetMangaUseCase";
import { badRequest, noContent, ok, serverError } from "../helpers";
import { InvalidParamError, ServerError } from "../errors";

export class GetMangaController implements Controller {
  constructor(
    private readonly getMangaUseCase: GetMangaUseCase,
    private readonly validateId: (id: string) => boolean
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      if (!this.validateId(id))
        return badRequest(response, new InvalidParamError("id"));

      const results = await this.getMangaUseCase.execute({ id });

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
