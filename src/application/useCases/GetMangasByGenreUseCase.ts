import { IUseCase } from "../useCases";
import { IMangaRepository } from "../repositories";
import {
  IGetMangasByGenreDTO,
  IResultsWithPageInfoDTO,
} from "../../domain/DTOs";

export class GetMangasByGenreUseCase
  implements IUseCase<IGetMangasByGenreDTO, IResultsWithPageInfoDTO>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: IGetMangasByGenreDTO): Promise<IResultsWithPageInfoDTO> {
    try {
      const results = await this.mangaRepository.getMangasByGenre(data);
      return results;
    } catch (error) {
      return null;
    }
  }
}
