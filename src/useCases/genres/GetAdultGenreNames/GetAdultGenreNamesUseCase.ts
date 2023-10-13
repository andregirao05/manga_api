import { IUseCase } from "protocols";
import { IMangaRepository } from "repositories";
import { IGetAdultGenreNamesDTO } from "./IGetAdultGenreNamesDTO";

export class GetAdultGenreNamesUseCase
  implements IUseCase<IGetAdultGenreNamesDTO, string[]>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: IGetAdultGenreNamesDTO): Promise<string[]> {
    let genreNames = await this.mangaRepository.getAdultGenreNames(data.origin);

    if (genreNames) genreNames.sort();

    return genreNames;
  }
}
