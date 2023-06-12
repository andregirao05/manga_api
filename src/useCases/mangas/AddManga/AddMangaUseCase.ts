import { IAddMangaDTO } from "./IAddMangaDTO";
import { MangaAlreadyExistError } from "errors";
import { IMangaRepository } from "repositories";
import { IUseCase } from "protocols";

export class AddMangaUseCase implements IUseCase<IAddMangaDTO, string> {
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: IAddMangaDTO): Promise<string> {
    const id = await this.mangaRepository.mangaExistsByInfo({
      url: data.url,
    });

    if (id) {
      throw new MangaAlreadyExistError(id);
    }

    const insertedId = await this.mangaRepository.add(data);

    return insertedId;
  }
}
