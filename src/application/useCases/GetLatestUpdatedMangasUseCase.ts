import { IUseCase } from "../useCases";
import { IMangaRepository } from "../repositories";
import {
  IGetLatestUpdatedMangasDTO,
  IResultsWithPageInfo,
} from "../../domain/models";
import { Manga } from "../../domain/entities";

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
