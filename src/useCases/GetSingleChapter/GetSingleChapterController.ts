import { Request, Response } from "express";
import { IController } from "../IController";
import { badRequest, noContent, ok, serverError } from "../../helpers";
import { InvalidParamError, ServerError } from "../../errors";
import { GetSingleChapterUseCase } from "./GetSingleChapterUseCase";

export class GetSingleChapterController implements IController {
  constructor(
    private readonly getSingleChapterUseCase: GetSingleChapterUseCase,
    private readonly validateId: (id: string) => boolean
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id, chapterName } = request.params;

      if (!this.validateId(id))
        return badRequest(response, new InvalidParamError("id"));

      const results = await this.getSingleChapterUseCase.execute({
        id,
        chapterName,
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
