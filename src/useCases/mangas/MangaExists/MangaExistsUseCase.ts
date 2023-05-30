import { DataNotFoundError } from "../../../errors";
import { IMangaRepository } from "../../../repositories";
import { IUseCase } from "../../../protocols/IUseCase";
import { IMangaExistsDTO } from "./IMangaExistsDTO";

export class MangaExistsUseCase implements IUseCase<IMangaExistsDTO, string> {
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: IMangaExistsDTO): Promise<string> {
    const { url } = data;

    const id = await this.mangaRepository.mangaExistsByInfo({
      url,
    });

    if (!id) {
      throw new DataNotFoundError("Manga not found");
    }

    return id;
  }
}
