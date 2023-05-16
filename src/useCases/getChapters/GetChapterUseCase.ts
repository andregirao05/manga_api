import { IUseCase } from "../../protocols";
import { IMangaRepository } from "../../repositories";
import { IGetChaptersDTO } from "../../models";
import { IResultsDTO } from "../../models/IResultsDTO";

export class GetChaptersUseCase
  implements IUseCase<IGetChaptersDTO, IResultsDTO>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  public async execute(data: IGetChaptersDTO): Promise<IResultsDTO> {
    try {
      const results = await this.mangaRepository.getChapters(data);
      return results;
    } catch (error) {
      return null;
    }
  }
}
