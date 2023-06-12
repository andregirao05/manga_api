import { IMangaRepository } from "repositories";
import { IUseCase } from "protocols";
import { IGetMangaDTO } from "./IGetMangaDTO";
import { IManga } from "entities";
import { MangaNotFoundError } from "errors";

export class GetMangaUseCase implements IUseCase<IGetMangaDTO, IManga> {
  constructor(private readonly mangaRepository: IMangaRepository) {}

  public async execute(data: IGetMangaDTO): Promise<IManga> {
    const { id } = data;
    const exists = await this.mangaRepository.mangaExistsById(id);

    if (!exists) {
      throw new MangaNotFoundError(id);
    }

    const manga = await this.mangaRepository.get(data);

    return manga;
  }
}
