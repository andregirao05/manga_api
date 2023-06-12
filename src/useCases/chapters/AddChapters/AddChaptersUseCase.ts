import { MangaNotFoundError, ChapterAlreadyExistError } from "../../../errors";
import { IMangaRepository } from "../../../repositories";
import { IUseCase } from "../../../protocols";
import { IAddChaptersDTO } from "./IAddChaptersDTO";

export class AddChaptersUseCase implements IUseCase<IAddChaptersDTO, boolean> {
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: IAddChaptersDTO): Promise<boolean> {
    const { id, chapters } = data;

    const chapterNames = await this.mangaRepository.getChapterNames({ id });

    if (!chapterNames) {
      throw new MangaNotFoundError(id);
    }

    for (const chapter of chapters) {
      if (chapterNames.includes(chapter.name)) {
        throw new ChapterAlreadyExistError(chapter.name);
      }
    }

    const wasInserted = await this.mangaRepository.addChapters({
      id,
      chapters,
    });

    return wasInserted;
  }
}
