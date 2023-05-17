import { IUseCase } from "../../protocols";
import { IMangaRepository } from "../../repositories";
import {
  IGetLatestUpdatedMangasDTO,
  IResultsWithPageInfoDTO,
} from "../../models";

export class GetLatestUpdatedMangasUseCase
  implements IUseCase<IGetLatestUpdatedMangasDTO, IResultsWithPageInfoDTO>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(
    data: IGetLatestUpdatedMangasDTO
  ): Promise<IResultsWithPageInfoDTO> {
    try {
      const results = await this.mangaRepository.getLatestUpdated(data);
      return results;
    } catch (error) {
      return null;
    }
  }
}
