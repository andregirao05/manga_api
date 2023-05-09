import { Manga } from "../../entities";
import { IUseCase } from "../../protocols";
import { IMangaRepository } from "../../repositories";
import { IGetLatestUpdatedMangasDTO } from "./IGetLatestUpdatedMangasDTO";

export class GetLatestUpdatedMangasUseCase implements IUseCase<IGetLatestUpdatedMangasDTO, Manga[]> {
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: IGetLatestUpdatedMangasDTO): Promise< Manga[]> {
    const { origin } = data;
    
    try {
      const mangas = await this.mangaRepository.getLatestUpdated(origin);
      return mangas;
    } catch (error) {
      return []
    }
  }
}