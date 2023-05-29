import { IMangaRepository } from "../../repositories";
import { IUseCase } from "../IUseCase";
import { IGetMangaDTO } from "./IGetMangaDTO";
import { IResults } from "../IResults";
import { Manga } from "../../entities";
import { MangaNotFound } from "../../errors";

export class GetMangaUseCase
  implements IUseCase<IGetMangaDTO, IResults<Manga>>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  public async execute(data: IGetMangaDTO): Promise<IResults<Manga>> {
    const { id } = data;
    const exists = await this.mangaRepository.mangaExistsById(id);

    if (!exists) {
      throw new MangaNotFound(id);
    }

    const manga = await this.mangaRepository.get(data);

    return {
      data: manga,
    };
  }
}
