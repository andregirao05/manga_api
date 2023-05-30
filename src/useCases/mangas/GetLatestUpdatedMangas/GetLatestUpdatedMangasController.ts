import { Request, Response } from "express";
import { IController } from "../../IController";
import { badRequest, ok, serverError } from "../../../helpers";
import { ServerError } from "../../../errors";
import { GetLatestUpdatedMangasUseCase } from "./GetLatestUpdatedMangasUseCase";
import { getLatestUpdatedMangasSchema } from "./getLatestUpdatedMangasValidate";
import { ValidationError } from "yup";

export class GetLatestUpdatedMangasController implements IController {
  constructor(
    private readonly getLatestUpdatedMangasUseCase: GetLatestUpdatedMangasUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { params } = request;

      const { origin, page } =
        getLatestUpdatedMangasSchema.validateSync(params);

      const results = await this.getLatestUpdatedMangasUseCase.execute({
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
