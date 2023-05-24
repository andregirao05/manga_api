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
    try {
      const { mangas, currentPage, totalPages } =
        await this.mangaRepository.getLatestUpdated(data);

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
