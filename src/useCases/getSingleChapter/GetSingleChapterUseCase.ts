import { IUseCase } from "../../protocols";
import { IMangaRepository } from "../../repositories";
import { IGetSingleChapterDTO, IResultsDTO } from "../../models";

export class GetSingleChapterUseCase
  implements IUseCase<IGetSingleChapterDTO, IResultsDTO>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: IGetSingleChapterDTO): Promise<IResultsDTO> {
    try {
      const chapter = await this.mangaRepository.getSingleChapter(data);
      return chapter;
    } catch (error) {
      return null;
    }
  }
}
