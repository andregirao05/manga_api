import { IUseCase } from "../IUseCase";
import { IMangaRepository } from "../../repositories";
import { ISearchMangasDTO } from "./ISearchMangasDTO";
import { IResultsWithPageInfo } from "../IResultsWithPageInfo";
import { Manga } from "../../entities";

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
