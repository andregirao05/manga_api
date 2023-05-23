import { IUseCase } from "../useCases";
import { IMangaRepository } from "../repositories";
import { IGetChapterNamesDTO, IResults } from "../../domain/DTOs";

export class GetChapterNamesUseCase
  implements IUseCase<IGetChapterNamesDTO, IResults<string[]>>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: IGetChapterNamesDTO): Promise<IResults<string[]>> {
    try {
      const chaptersNames = await this.mangaRepository.getChapterNames(data);

      return {
        data: chaptersNames,
      };
    } catch (error) {
      return null;
    }
  }
}
