import { IUseCase } from "../useCases";
import { IMangaRepository } from "../repositories";
import {
  IGetMangasByGenreDTO,
  IResultsWithPageInfo,
} from "../../domain/models";
import { Manga } from "../../domain/entities";

export class GetMangasByGenreUseCase
  implements IUseCase<IGetMangasByGenreDTO, IResultsWithPageInfo<Manga[]>>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(
    data: IGetMangasByGenreDTO
  ): Promise<IResultsWithPageInfo<Manga[]>> {
    try {
      const { mangas, currentPage, totalPages } =
        await this.mangaRepository.getMangasByGenre(data);

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
