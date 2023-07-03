import { IUseCase } from "protocols";
import { IChapterRepository } from "repositories";
import { IGetChaptersDTO } from "./IGetChaptersDTO";
import { IChapter } from "entities";
import { MangaNotFoundError } from "errors";

export class GetChaptersUseCase
  implements IUseCase<IGetChaptersDTO, IChapter[]>
{
  constructor(private readonly chapterRepository: IChapterRepository) {}

  public async execute(data: IGetChaptersDTO): Promise<IChapter[]> {
    const { id } = data;
    const chapters = await this.chapterRepository.getAll({ id });

    if (!chapters) throw new MangaNotFoundError(id);

    return chapters;
  }
}
