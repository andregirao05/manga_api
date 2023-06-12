import { IUseCase } from "../../../protocols";
import { IMangaRepository } from "../../../repositories";
import { IGetChapterNamesDTO } from "./IGetChapterNamesDTO";
import { MangaNotFoundError } from "../../../errors";

export class GetChapterNamesUseCase
  implements IUseCase<IGetChapterNamesDTO, string[]>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: IGetChapterNamesDTO): Promise<string[]> {
    const { id } = data;

    const chaptersNames = await this.mangaRepository.getChapterNames({
      id,
    });

    if (!chaptersNames) throw new MangaNotFoundError(id);

    return chaptersNames;
  }
}
