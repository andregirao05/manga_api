import { IUseCase } from "../../protocols";
import { IMangaRepository } from "../../repositories";
import { IGetChapterNamesDTO } from "../../models";
import { IResultsDTO } from "../../models/IResultsDTO";

export class GetChapterNamesUseCase
  implements IUseCase<IGetChapterNamesDTO, IResultsDTO>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: IGetChapterNamesDTO): Promise<IResultsDTO> {
    try {
      const results = await this.mangaRepository.getChapterNames(data);
      return results;
    } catch (error) {
      return null;
    }
  }
}
