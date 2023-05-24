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
    try {
      const { mangas, currentPage, totalPages } =
        await this.mangaRepository.getPopulars(data);

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
