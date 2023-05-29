import { DataNotFoundError, MangaNotFound } from "../../errors";
import { IMangaRepository } from "../../repositories";
import { IResults } from "../IResults";
import { IUseCase } from "../IUseCase";
import { IMangaExistsDTO } from "./IMangaExistsDTO";

export class MangaExistsUseCase
  implements IUseCase<IMangaExistsDTO, IResults<string>>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: IMangaExistsDTO): Promise<IResults<string>> {
    const { url } = data;

    const id = await this.mangaRepository.mangaExistsByInfo({
      url,
    });

    if (!id) {
      throw new DataNotFoundError("Manga not found");
    }

    return {
      data: id,
    };
  }
}
