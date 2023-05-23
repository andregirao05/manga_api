import { IUseCase } from "../useCases";
import { IMangaRepository } from "../repositories";
import { ISearchMangasDTO, IResultsWithPageInfoDTO } from "../../domain/DTOs";

export class SearchMangasUseCase
  implements IUseCase<ISearchMangasDTO, IResultsWithPageInfoDTO>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: ISearchMangasDTO): Promise<IResultsWithPageInfoDTO> {
    try {
      const mangas = await this.mangaRepository.search(data);
      return mangas;
    } catch (error) {
      return null;
    }
  }
}
