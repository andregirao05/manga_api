import { IUseCase } from "../../../protocols/IUseCase";
import { IMangaRepository, IMangaPage } from "../../../repositories";
import { IGetMangasByGenreDTO } from "./IGetMangasByGenreDTO";
import { Manga } from "../../../entities";
import { DataNotFoundError } from "../../../errors";

export class GetMangasByGenreUseCase
  implements IUseCase<IGetMangasByGenreDTO, IMangaPage>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: IGetMangasByGenreDTO): Promise<IMangaPage> {
    const { genreName, page } = data;

    const { mangas, currentPage, totalPages } =
      await this.mangaRepository.getMangasByGenre({ genreName, page });

    if (!mangas || mangas.length == 0) {
      throw new DataNotFoundError(`Genre ${genreName}`);
    }

    return {
      mangas,
      currentPage,
      totalPages,
    };
  }
}
