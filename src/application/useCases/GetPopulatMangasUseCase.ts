import { IUseCase } from "../useCases";
import { IMangaRepository } from "../repositories";
import {
  IGetPopularMangasDTO,
  IResultsWithPageInfo,
} from "../../domain/models";
import { Manga } from "../../domain/entities";

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
