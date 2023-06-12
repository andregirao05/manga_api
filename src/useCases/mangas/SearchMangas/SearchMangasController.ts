import { IController } from "protocols";
import { badRequest, ok, serverError } from "helpers";
import { ServerError, ValidationError } from "errors";
import { SearchMangasUseCase } from "./SearchMangasUseCase";
import { ISearchMangasDTO } from "./ISearchMangasDTO";
import { IRequest, IResponse } from "protocols";
import { IValidator } from "validation";

export class SearchMangasController implements IController {
  constructor(
    private readonly searchMangasUseCase: SearchMangasUseCase,
    private readonly validator: IValidator<ISearchMangasDTO>
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { origin, searchTerm, page } = await this.validator.validate(
        request.params
      );
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
