import { Manga } from "../../entities";
import { IUseCase } from "../../protocols";
import { IMangaRepository } from "../../repositories";
import { ISearchMangasDTO } from "./ISearchMangasDTO";

export class SearchMangasUseCase implements IUseCase<ISearchMangasDTO, Manga[]> {
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: ISearchMangasDTO): Promise< Manga[]> {
    const { origin, searchTerm } = data;
    
    try {
      const mangas = await this.mangaRepository.search(origin, searchTerm);
      return mangas;
    } catch (error) {
      return []
    }
  }
}