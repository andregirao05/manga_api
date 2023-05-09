import { Manga } from "../../entities";
import { IUseCase } from "../../protocols";
import { IMangaRepository } from "../../repositories";
import { IGetPopularMangasDTO } from "./IGetPopularMangasDTO";

export class GetPopularMangasUseCase implements IUseCase<IGetPopularMangasDTO, Manga[]> {
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: IGetPopularMangasDTO): Promise< Manga[]> {
    const { origin } = data;
    
    try {
      const mangas = await this.mangaRepository.getPopulars(origin);
      return mangas;
    } catch (error) {
      return []
    }
  }
}