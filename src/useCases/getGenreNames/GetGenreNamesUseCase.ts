import { IUseCase } from "../../protocols";
import { IMangaRepository } from "../../repositories";
import { IGetGenreNamesDTO, IResultsDTO } from "../../models";

export class GetGenreNamesUseCase
  implements IUseCase<IGetGenreNamesDTO, IResultsDTO>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: IGetGenreNamesDTO): Promise<IResultsDTO> {
    try {
      const results = await this.mangaRepository.listGenres(data);
      return results;
    } catch (error) {
      return null;
    }
  }
}
