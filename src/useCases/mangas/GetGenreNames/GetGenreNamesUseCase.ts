import { IUseCase } from "../../IUseCase";
import { IMangaRepository } from "../../../repositories";
import { IGetGenreNamesDTO } from "./IGetGenreNamesDTO";
import { IResults } from "../../IResults";

export class GetGenreNamesUseCase
  implements IUseCase<IGetGenreNamesDTO, IResults<string[]>>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: IGetGenreNamesDTO): Promise<IResults<string[]>> {
    const genreNames = await this.mangaRepository.getGenreNames(data);

    return {
      data: genreNames,
    };
  }
}
