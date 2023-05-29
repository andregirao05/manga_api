import { MangaNotFound } from "../../errors";
import { ChapterAlreadyExistError } from "../../errors/chapterAlreadyRegisteredError";
import { IMangaRepository } from "../../repositories";
import { IResults } from "../IResults";
import { IUseCase } from "../IUseCase";
import { IAddChaptersDTO } from "./IAddChaptersDTO";

export class AddChaptersUseCase
  implements IUseCase<IAddChaptersDTO, IResults<boolean>>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: IAddChaptersDTO): Promise<IResults<boolean>> {
    const { id, chapters } = data;

    const chapterNames = await this.mangaRepository.getChapterNames({ id });

    if (!chapterNames) {
      throw new MangaNotFound(id);
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

    return {
      data: wasInserted,
    };
  }
}
