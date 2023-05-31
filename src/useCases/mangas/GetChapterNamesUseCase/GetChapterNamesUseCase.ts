import { IUseCase } from "../../../protocols/IUseCase";
import { IMangaRepository } from "../../../repositories";
import { IGetChapterNamesDTO } from "./IGetChapterNamesDTO";
import { MangaNotFound } from "../../../errors";

export class GetChapterNamesUseCase
  implements IUseCase<IGetChapterNamesDTO, string[]>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: IGetChapterNamesDTO): Promise<string[]> {
    const { id } = data;

    const chaptersNames = await this.mangaRepository.getChapterNames({
      id,
    });

    if (!chaptersNames) throw new MangaNotFound(id);

    return chaptersNames;
  }
}
