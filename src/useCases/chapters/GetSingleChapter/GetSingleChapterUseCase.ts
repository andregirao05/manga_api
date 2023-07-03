import { IUseCase } from "protocols";
import { IChapterRepository } from "repositories";
import { IGetSingleChapterDTO } from "./IGetSingleChapterDTO";
import { IChapter } from "entities";
import { DataNotFoundError } from "errors";

export class GetSingleChapterUseCase
  implements IUseCase<IGetSingleChapterDTO, IChapter>
{
  constructor(private readonly chapterRepository: IChapterRepository) {}

  async execute(data: IGetSingleChapterDTO): Promise<IChapter> {
    const { id, chapterName } = data;

    const chapter = await this.chapterRepository.get({
      id,
      chapterName,
    });

    if (!chapter) throw new DataNotFoundError("Data");

    return chapter;
  }
}
