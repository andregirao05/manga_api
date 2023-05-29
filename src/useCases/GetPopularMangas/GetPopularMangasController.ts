import { Request, Response } from "express";
import { IController } from "../IController";
import { badRequest, ok, serverError } from "../../helpers";
import { ServerError } from "../../errors";
import { GetPopularMangasUseCase } from "./GetPopularMangasUseCase";
import { getPopularMangasSchema } from "./getPopularMangasValidate";
import { ValidationError } from "yup";

export class GetPopularMangasController implements IController {
  constructor(
    private readonly getPopularMangasUseCase: GetPopularMangasUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { params } = request;

      const { origin, page } = getPopularMangasSchema.validateSync(params);

      const results = await this.getPopularMangasUseCase.execute({
        origin,
        page,
      });

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
