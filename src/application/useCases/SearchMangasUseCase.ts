import { IUseCase } from "../useCases";
import { IMangaRepository } from "../repositories";
import { ISearchMangasDTO, IResultsWithPageInfo } from "../../domain/models";
import { Manga } from "../../domain/entities";

export class SearchMangasUseCase
  implements IUseCase<ISearchMangasDTO, IResultsWithPageInfo<Manga[]>>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(
    data: ISearchMangasDTO
  ): Promise<IResultsWithPageInfo<Manga[]>> {
    try {
      const { mangas, currentPage, totalPages } =
        await this.mangaRepository.search(data);

      return {
        data: mangas,
        currentPage,
        totalPages,
      };
    } catch (error) {
      return null;
    }
  }
}
