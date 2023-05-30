import { IUseCase } from "../../../protocols/IUseCase";
import { IMangaRepository } from "../../../repositories";
import { IGetChaptersDTO } from "./IGetChaptersDTO";
import { IChapter } from "../../../entities";
import { MangaNotFound } from "../../../errors";

export class GetChaptersUseCase
  implements IUseCase<IGetChaptersDTO, IChapter[]>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  public async execute(data: IGetChaptersDTO): Promise<IChapter[]> {
    const { id } = data;
    const chapters = await this.mangaRepository.getChapters({ id });

    if (!chapters) throw new MangaNotFound(id);

    return chapters;
  }
}
