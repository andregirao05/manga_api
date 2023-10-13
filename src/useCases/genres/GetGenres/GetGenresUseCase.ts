import { IUseCase } from "protocols";
import { IMangaRepository } from "repositories";
import { IGetGenresDTO } from "./IGetGenresDTO";
import { IGenre } from "entities";

export class GetGenresUseCase implements IUseCase<IGetGenresDTO, IGenre[]> {
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: IGetGenresDTO): Promise<IGenre[]> {
    let genres = await this.mangaRepository.getGenres(data.origin);

    if (genres)
      genres.sort((genre1, genre2) => {
        if (genre1.name < genre2.name) return -1;
        else return 0;
      });

    return genres;
  }
}
