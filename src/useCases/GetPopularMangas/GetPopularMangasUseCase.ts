import { IUseCase } from "../IUseCase";
import { IMangaRepository } from "../../repositories";
import { IGetPopularMangasDTO } from "./IGetPopularMangasDTO";
import { IResultsWithPageInfo } from "../IResultsWithPageInfo";
import { Manga } from "../../entities";

export class GetPopularMangasUseCase
  implements IUseCase<IGetPopularMangasDTO, IResultsWithPageInfo<Manga[]>>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(
    data: IGetPopularMangasDTO
  ): Promise<IResultsWithPageInfo<Manga[]>> {
    const { origin, page } = data;

    const { mangas, currentPage, totalPages } =
      await this.mangaRepository.getPopulars({ origin, page });

    return {
      data: mangas,
      currentPage,
      totalPages,
    };
  }
}
