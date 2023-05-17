import { IMangaRepository } from "../../repositories";
import { IUseCase } from "../../protocols";
import { IGetMangaDTO } from "../../models";
import { IResultsDTO } from "../../models/IResultsDTO";

export class GetMangaUseCase implements IUseCase<IGetMangaDTO, IResultsDTO> {
  constructor(private readonly mangaRepository: IMangaRepository) {}

  public async execute(data: IGetMangaDTO): Promise<IResultsDTO> {
    try {
      const results = await this.mangaRepository.get(data);
      return results;
    } catch (error) {
      return null;
    }
  }
}
