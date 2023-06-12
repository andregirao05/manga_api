import { IUseCase } from "protocols";
import { IMangaRepository, IMangaPage } from "repositories";
import { IGetPopularMangasDTO } from "./IGetPopularMangasDTO";

export class GetPopularMangasUseCase
  implements IUseCase<IGetPopularMangasDTO, IMangaPage>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: IGetPopularMangasDTO): Promise<IMangaPage> {
    const { origin, page } = data;

    const { mangas, currentPage, totalPages } =
      await this.mangaRepository.getPopulars({ origin, page });

    return {
      mangas,
      currentPage,
      totalPages,
    };
  }
}
