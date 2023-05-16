import { IUseCase } from "../../protocols";
import { IMangaRepository } from "../../repositories";
import { IGetPopularMangasDTO, IResultsWithPageInfoDTO } from "../../models";

export class GetPopularMangasUseCase
  implements IUseCase<IGetPopularMangasDTO, IResultsWithPageInfoDTO>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: IGetPopularMangasDTO): Promise<IResultsWithPageInfoDTO> {
    try {
      const results = await this.mangaRepository.getPopulars(data);
      return results;
    } catch (error) {
      return null;
    }
  }
}
