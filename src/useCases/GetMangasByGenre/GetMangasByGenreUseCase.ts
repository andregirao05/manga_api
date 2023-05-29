import { IUseCase } from "../IUseCase";
import { IMangaRepository } from "../../repositories";
import { IGetMangasByGenreDTO } from "./IGetMangasByGenreDTO";
import { IResultsWithPageInfo } from "../IResultsWithPageInfo";
import { Manga } from "../../entities";
import { DataNotFoundError } from "../../errors";

export class GetMangasByGenreUseCase
  implements IUseCase<IGetMangasByGenreDTO, IResultsWithPageInfo<Manga[]>>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(
    data: IGetMangasByGenreDTO
  ): Promise<IResultsWithPageInfo<Manga[]>> {
    const { genreName, page } = data;

    const { mangas, currentPage, totalPages } =
      await this.mangaRepository.getMangasByGenre({ genreName, page });

    if (!mangas || mangas.length == 0) {
      throw new DataNotFoundError(`Genre ${genreName}`);
    }

    return {
      data: mangas,
      currentPage,
      totalPages,
    };
  }
}
