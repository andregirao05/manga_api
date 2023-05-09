import { IUseCase } from "../../protocols";
import { IMangaRepository } from "../../repositories";
import { IGetChapterNamesDTO } from "./IGetChapterNamesDTO";

export class GetChapterNamesUseCase implements IUseCase<IGetChapterNamesDTO, string[]> {
  constructor(private readonly mangaRepository: IMangaRepository) {}
  
  async execute(data: IGetChapterNamesDTO): Promise<string[]> {
    const { id } = data;
    
    try {
      const chaptersNames = await this.mangaRepository.getChapterNames(id);
      return chaptersNames;
    } catch (error) {
      return null
    }
  }
}