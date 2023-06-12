import { IUseCase } from "protocols";
import { IMangaRepository, IMangaPage } from "repositories";
import { IGetLatestUpdatedMangasDTO } from "./IGetLatestUpdatedMangasDTO";

export class GetLatestUpdatedMangasUseCase
  implements IUseCase<IGetLatestUpdatedMangasDTO, IMangaPage>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: IGetLatestUpdatedMangasDTO): Promise<IMangaPage> {
    const { origin, page } = data;

    const { mangas, currentPage, totalPages } =
      await this.mangaRepository.getLatestUpdated({ origin, page });

    return {
      mangas,
      currentPage,
      totalPages,
    };
  }
}
