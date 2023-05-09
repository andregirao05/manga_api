import { IMangaRepository } from "../../repositories";
import { Manga } from "../../entities";
import { IUseCase } from "../../protocols";
import { IGetMangaDTO } from "./IGetMangaDTO";

export class GetMangaUseCase implements IUseCase<IGetMangaDTO, Manga> {
  constructor(private readonly mangaRepository: IMangaRepository) {}

  public async execute(data: IGetMangaDTO): Promise<Manga> {
    const { id } = data;
    
    try {
      const manga = await this.mangaRepository.get(id);
      return manga;
    } catch (error) {
      return null
    }
  }
}
