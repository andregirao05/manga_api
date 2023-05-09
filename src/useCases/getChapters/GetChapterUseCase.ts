import { Chapter } from "../../entities";
import { IUseCase } from "../../protocols";
import { IMangaRepository } from "../../repositories";
import { IGetChaptersDTO } from "./IGetChaptersDTO";

export class GetChaptersUseCase implements IUseCase<IGetChaptersDTO, Chapter[]> {
  constructor(private readonly mangaRepository: IMangaRepository) {}

  public async execute(data: IGetChaptersDTO): Promise<Chapter[]> {
    const { id } = data;
    
    try {
      const chapters = await this.mangaRepository.getChapters(id);
      return chapters;
    } catch (error) {
      return null
    }
  }
}
