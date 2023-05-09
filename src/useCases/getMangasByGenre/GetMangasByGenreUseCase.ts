import { Manga } from "../../entities";
import { IUseCase } from "../../protocols";
import { IMangaRepository } from "../../repositories";
import { IGetMangasByGenreDTO } from "./IGetMangasByGenreDTO";

export class GetMangasByGenreUseCase implements IUseCase<IGetMangasByGenreDTO, Manga[]> {
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: IGetMangasByGenreDTO): Promise< Manga[]> {
    const { genreName } = data;
    
    try {
      const mangas = await this.mangaRepository.getMangasByGenre(genreName);
      return mangas;
    } catch (error) {
      return []
    }
  }
}