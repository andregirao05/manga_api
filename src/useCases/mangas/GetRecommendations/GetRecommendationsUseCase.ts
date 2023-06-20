import { IUseCase } from "protocols";
import { IMangaRepository, IMangaPage } from "repositories";
import { IGetRecommendationsDTO } from "./IGetRecommendationsDTO";

export class GetRecommendationsUseCase
  implements IUseCase<IGetRecommendationsDTO, IMangaPage>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: IGetRecommendationsDTO): Promise<IMangaPage> {
    const { origin, page } = data;

    const { mangas, currentPage, totalPages } =
      await this.mangaRepository.getRecommendations({ origin, page });

    return {
      mangas,
      currentPage,
      totalPages,
    };
  }
}
