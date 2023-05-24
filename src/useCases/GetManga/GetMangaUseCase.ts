import { IMangaRepository } from "../../repositories";
import { IUseCase } from "../IUseCase";
import { IGetMangaDTO } from "./IGetMangaDTO";
import { IResults } from "../IResults";
import { Manga } from "../../entities";

export class GetMangaUseCase
  implements IUseCase<IGetMangaDTO, IResults<Manga>>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  public async execute(data: IGetMangaDTO): Promise<IResults<Manga>> {
    try {
      const manga = await this.mangaRepository.get(data);

      return {
        data: manga,
      };
    } catch (error) {
      return null;
    }
  }
}
