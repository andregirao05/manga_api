import { Chapter } from "../../entities";
import { IUseCase } from "../../protocols";
import { IMangaRepository } from "../../repositories";
import { IGetSingleChapterDTO } from "./IGetSingleChapterDTO";

export class GetSingleChapterUseCase implements IUseCase<IGetSingleChapterDTO, Chapter> {
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: IGetSingleChapterDTO): Promise<Chapter> {
    const { id, chapterName } = data;
    
    try {
      const chapter = await this.mangaRepository.getSingleChapter(id, chapterName);
      return chapter;
    } catch (error) {
      return null
    }
  }
}