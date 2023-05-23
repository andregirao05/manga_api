import { IUseCase } from "../useCases";
import { IMangaRepository } from "../repositories";
import { IGetChaptersDTO, IResults } from "../../domain/models";
import { Chapter } from "../../domain/entities";

export class GetChaptersUseCase
  implements IUseCase<IGetChaptersDTO, IResults<Chapter[]>>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  public async execute(data: IGetChaptersDTO): Promise<IResults<Chapter[]>> {
    try {
      const chapters = await this.mangaRepository.getChapters(data);

      return {
        data: chapters,
      };
    } catch (error) {
      return null;
    }
  }
}
