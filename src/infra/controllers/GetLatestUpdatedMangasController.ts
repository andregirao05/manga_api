import { Request, Response } from "express";
import { Controller } from "./Controller";
import { badRequest, noContent, ok, serverError } from "../helpers";
import { InvalidParamError, ServerError } from "../errors";
import { GetLatestUpdatedMangasUseCase } from "../../application/useCases/GetLatestUpdatedMangasUseCase";

export class GetLatestUpdatedMangasController implements Controller {
  constructor(
    private readonly getLatestUpdatedMangasUseCase: GetLatestUpdatedMangasUseCase,
    private readonly acceptedOrigins: string[],
    private readonly validatePage: (page: string) => boolean
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { origin, page } = request.params;

      if (!this.acceptedOrigins.includes(origin))
        return badRequest(response, new InvalidParamError("origin"));

      if (!this.validatePage(page))
        return badRequest(response, new InvalidParamError("page"));

      const results = await this.getLatestUpdatedMangasUseCase.execute({
        origin,
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
