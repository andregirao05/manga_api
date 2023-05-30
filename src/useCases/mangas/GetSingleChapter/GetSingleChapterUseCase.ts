import { IUseCase } from "../../../protocols/IUseCase";
import { IMangaRepository } from "../../../repositories";
import { IGetSingleChapterDTO } from "./IGetSingleChapterDTO";
import { IChapter } from "../../../entities";
import { DataNotFoundError, MangaNotFound } from "../../../errors";

export class GetSingleChapterUseCase
  implements IUseCase<IGetSingleChapterDTO, IChapter>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: IGetSingleChapterDTO): Promise<IChapter> {
    const { id, chapterName } = data;

    const chapter = await this.mangaRepository.getSingleChapter({
      id,
      chapterName,
    });

    if (!chapter) throw new DataNotFoundError("Data");

    return chapter;
  }
}
