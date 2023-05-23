import { IUseCase } from "../useCases";
import { IMangaRepository } from "../repositories";
import { IGetSingleChapterDTO, IResults } from "../../domain/DTOs";
import { Chapter } from "../../domain/entities";

export class GetSingleChapterUseCase
  implements IUseCase<IGetSingleChapterDTO, IResults<Chapter>>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: IGetSingleChapterDTO): Promise<IResults<Chapter>> {
    try {
      const chapter = await this.mangaRepository.getSingleChapter(data);

      return {
        data: chapter,
      };
    } catch (error) {
      return null;
    }
  }
}
