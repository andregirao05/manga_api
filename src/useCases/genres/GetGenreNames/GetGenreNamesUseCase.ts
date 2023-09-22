import { IUseCase } from "protocols";
import { IMangaRepository } from "repositories";
import { IGetGenreNamesDTO } from "./IGetGenreNamesDTO";

export class GetGenreNamesUseCase
  implements IUseCase<IGetGenreNamesDTO, string[]>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: IGetGenreNamesDTO): Promise<string[]> {
    let genreNames = await this.mangaRepository.getGenreNames(data);

    if (genreNames) genreNames.sort();

    return genreNames;
  }
}
