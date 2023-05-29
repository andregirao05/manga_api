import { IUseCase } from "../IUseCase";
import { IMangaRepository } from "../../repositories";
import { Manga } from "../../entities";
import { IGetLatestUpdatedMangasDTO } from "./IGetLatestUpdatedMangasDTO";
import { IResultsWithPageInfo } from "../IResultsWithPageInfo";

export class GetLatestUpdatedMangasUseCase
  implements
    IUseCase<IGetLatestUpdatedMangasDTO, IResultsWithPageInfo<Manga[]>>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(
    data: IGetLatestUpdatedMangasDTO
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
