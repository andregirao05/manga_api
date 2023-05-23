import { Request, Response } from "express";
import { Controller } from "./Controller";
import { badRequest, noContent, ok, serverError } from "../helpers";
import { InvalidParamError, ServerError } from "../errors";
import { GetChapterNamesUseCase } from "../../application/useCases/GetChapterNamesUseCase";

export class GetChapterNamesController implements Controller {
  constructor(
    private readonly getChapterNamesUseCase: GetChapterNamesUseCase,
    private readonly validateId: (id: string) => boolean
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      if (!this.validateId(id))
        return badRequest(response, new InvalidParamError("id"));

      const results = await this.getChapterNamesUseCase.execute({ id });

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
