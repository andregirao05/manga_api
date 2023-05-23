import { IUseCase } from "../useCases";
import { IMangaRepository } from "../repositories";
import { IGetGenreNamesDTO, IResults } from "../../domain/models";

export class GetGenreNamesUseCase
  implements IUseCase<IGetGenreNamesDTO, IResults<string[]>>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: IGetGenreNamesDTO): Promise<IResults<string[]>> {
    try {
      const genreNames = await this.mangaRepository.getGenreNames(data);

      return {
        data: genreNames,
      };
    } catch (error) {
      return null;
    }
  }
}
