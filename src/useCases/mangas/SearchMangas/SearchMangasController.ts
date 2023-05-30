import { IController } from "../../../protocols/IController";
import { badRequest, ok, serverError } from "../../../helpers";
import { ServerError } from "../../../errors";
import { SearchMangasUseCase } from "./SearchMangasUseCase";
import { searchMangasValidate } from "./searchMangasValidate";
import { ISearchMangasDTO } from "./ISearchMangasDTO";
import { ValidationError } from "yup";
import { IRequest, IResponse } from "../../../protocols";

export class SearchMangasController implements IController {
  constructor(private readonly searchMangasUseCase: SearchMangasUseCase) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { origin, searchTerm, page } = searchMangasValidate.validateSync(
        request.query
      ) as ISearchMangasDTO;
      const results = await this.searchMangasUseCase.execute({
        origin,
        searchTerm,
        page,
      });

      return ok(results);
    } catch (error) {
      console.log(error);

      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      return serverError(new ServerError("Unexpected Error"));
    }
  }
}
