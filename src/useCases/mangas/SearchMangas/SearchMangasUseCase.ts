import { IUseCase } from "../../../protocols/IUseCase";
import { IMangaPage, IMangaRepository } from "../../../repositories";
import { ISearchMangasDTO } from "./ISearchMangasDTO";

export class SearchMangasUseCase
  implements IUseCase<ISearchMangasDTO, IMangaPage>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: ISearchMangasDTO): Promise<IMangaPage> {
    const { mangas, currentPage, totalPages } =
      await this.mangaRepository.search(data);

    return {
      mangas,
      currentPage,
      totalPages,
    };
  }
}
