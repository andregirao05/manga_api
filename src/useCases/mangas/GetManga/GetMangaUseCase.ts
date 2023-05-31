import { IMangaRepository } from "../../../repositories";
import { IUseCase } from "../../../protocols/IUseCase";
import { IGetMangaDTO } from "./IGetMangaDTO";
import { IManga } from "../../../entities";
import { MangaNotFound } from "../../../errors";

export class GetMangaUseCase implements IUseCase<IGetMangaDTO, IManga> {
  constructor(private readonly mangaRepository: IMangaRepository) {}

  public async execute(data: IGetMangaDTO): Promise<IManga> {
    const { id } = data;
    const exists = await this.mangaRepository.mangaExistsById(id);

    if (!exists) {
      throw new MangaNotFound(id);
    }

    const manga = await this.mangaRepository.get(data);

    return manga;
  }
}
