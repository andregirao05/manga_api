import { Request, Response } from "express";
import { IController } from "../IController";
import { badRequest, noContent, ok, serverError } from "../../helpers";
import { ServerError } from "../../errors";
import { SearchMangasUseCase } from "./SearchMangasUseCase";
import { searchMangasValidate } from "./searchMangasValidate";
import { ISearchMangasDTO } from "./ISearchMangasDTO";
import { ValidationError } from "yup";

export class SearchMangasController implements IController {
  constructor(private readonly searchMangasUseCase: SearchMangasUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { params } = request;

      const { origin, searchTerm, page } = searchMangasValidate.validateSync(
        params
      ) as ISearchMangasDTO;
      const results = await this.searchMangasUseCase.execute({
        origin,
        searchTerm,
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
