import { IMangaRepository } from "../repositories";
import { IUseCase } from "../useCases";
import { IGetMangaDTO, IResults } from "../../domain/models";
import { Manga } from "../../domain/entities";

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
