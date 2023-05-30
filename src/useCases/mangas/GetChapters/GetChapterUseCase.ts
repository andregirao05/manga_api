import { IUseCase } from "../../IUseCase";
import { IMangaRepository } from "../../../repositories";
import { IGetChaptersDTO } from "./IGetChaptersDTO";
import { IResults } from "../../IResults";
import { Chapter } from "../../../entities";
import { MangaNotFound } from "../../../errors";

export class GetChaptersUseCase
  implements IUseCase<IGetChaptersDTO, IResults<Chapter[]>>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  public async execute(data: IGetChaptersDTO): Promise<IResults<Chapter[]>> {
    const { id } = data;
    const chapters = await this.mangaRepository.getChapters({ id });

    if (!chapters) throw new MangaNotFound(id);

    return {
      data: chapters,
    };
  }
}
