import { UpdateNotFoundError } from "errors";
import { IMangaRepository } from "repositories";
import { IUseCase } from "protocols";
import { ISetUpdateDTO } from "./ISetUpdateDTO";

export class SetUpdateUseCase implements IUseCase<ISetUpdateDTO, boolean> {
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: ISetUpdateDTO): Promise<boolean> {
    const { origin, language, latest_updates, populars } = data;

    const updateExist = await this.mangaRepository.updateExists(origin);

    if (!updateExist) {
      throw new UpdateNotFoundError(origin);
    }

    const wasInserted = await this.mangaRepository.setUpdate({
      origin,
      language,
      latest_updates,
      populars,
    });

    return wasInserted;
  }
}
