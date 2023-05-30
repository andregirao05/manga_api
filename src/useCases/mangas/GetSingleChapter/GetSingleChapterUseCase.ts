import { IUseCase } from "../../IUseCase";
import { IMangaRepository } from "../../../repositories";
import { IGetSingleChapterDTO } from "./IGetSingleChapterDTO";
import { IResults } from "../../IResults";
import { Chapter } from "../../../entities";
import { MangaNotFound } from "../../../errors";

export class GetSingleChapterUseCase
  implements IUseCase<IGetSingleChapterDTO, IResults<Chapter>>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: IGetSingleChapterDTO): Promise<IResults<Chapter>> {
    const { id, chapterName } = data;

    const chapter = await this.mangaRepository.getSingleChapter({
      id,
      chapterName,
    });

    if (!chapter) throw new MangaNotFound(id);

    return {
      data: chapter,
    };
  }
}
