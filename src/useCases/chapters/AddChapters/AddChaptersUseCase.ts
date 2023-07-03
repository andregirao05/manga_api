import { MangaNotFoundError, ChapterAlreadyExistError } from "errors";
import { IChapterRepository } from "repositories";
import { IUseCase } from "protocols";
import { IAddChaptersDTO } from "./IAddChaptersDTO";

export class AddChaptersUseCase implements IUseCase<IAddChaptersDTO, boolean> {
  constructor(private readonly chaptersRepository: IChapterRepository) {}

  async execute(data: IAddChaptersDTO): Promise<boolean> {
    const { id, chapters } = data;

    const chapterNames = await this.chaptersRepository.getNames({ id });

    if (!chapterNames) {
      throw new MangaNotFoundError(id);
    }

    for (const chapter of chapters) {
      if (chapterNames.includes(chapter.name)) {
        throw new ChapterAlreadyExistError(chapter.name);
      }
    }

    const wasInserted = await this.chaptersRepository.addAll({
      id,
      chapters,
    });

    return wasInserted;
  }
}
