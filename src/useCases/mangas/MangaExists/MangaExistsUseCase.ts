import { IMangaRepository } from "repositories";
import { IUseCase } from "protocols";
import { IMangaExistsDTO } from "./IMangaExistsDTO";

export class MangaExistsUseCase implements IUseCase<IMangaExistsDTO, string> {
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: IMangaExistsDTO): Promise<string> {
    const { url } = data;

    const id = await this.mangaRepository.mangaExistsByInfo({
      url,
    });

    return id;
  }
}
