import { IUseCase } from "../IUseCase";
import { IMangaRepository } from "../../repositories";
import { IGetChapterNamesDTO } from "./IGetChapterNamesDTO";
import { IResults } from "../IResults";
import { MangaNotFound } from "../../errors";

export class GetChapterNamesUseCase
  implements IUseCase<IGetChapterNamesDTO, IResults<string[]>>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: IGetChapterNamesDTO): Promise<IResults<string[]>> {
    const { id } = data;

    const chaptersNames = await this.mangaRepository.getChapterNames({
      id,
    });

    if (!chaptersNames) throw new MangaNotFound(id);

    return {
      data: chaptersNames,
    };
  }
}
