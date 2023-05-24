import { IUseCase } from "../IUseCase";
import { IMangaRepository } from "../../repositories";
import { IGetChapterNamesDTO } from "./IGetChapterNamesDTO";
import { IResults } from "../IResults";

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
