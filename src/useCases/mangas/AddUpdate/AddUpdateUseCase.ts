import { UpdateAlreadyRegisteredError } from "../../../errors";
import { IMangaRepository } from "../../../repositories";
import { IUseCase } from "../../../protocols/IUseCase";
import { IAddUpdateDTO } from "./IAddUpdateDTO";

export class AddUpdateUseCase implements IUseCase<IAddUpdateDTO, string> {
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: IAddUpdateDTO): Promise<string> {
    const { origin, language, latest_updates, populars } = data;

    const updateExist = await this.mangaRepository.updateExists(origin);

    if (updateExist) {
      throw new UpdateAlreadyRegisteredError(origin);
    }

    const insertedId = await this.mangaRepository.addUpdate({
      origin,
      language,
      latest_updates,
      populars,
    });

    return insertedId;
  }
}
