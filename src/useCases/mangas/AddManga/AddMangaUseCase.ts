import { IAddMangaDTO } from "./IAddMangaDTO";
import { MangaAlreadyExist } from "../../../errors";
import { IMangaRepository } from "../../../repositories";
import { IUseCase } from "../../../protocols/IUseCase";

export class AddMangaUseCase implements IUseCase<IAddMangaDTO, string> {
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: IAddMangaDTO): Promise<string> {
    const id = await this.mangaRepository.mangaExistsByInfo({
      url: data.url,
    });

    if (id) {
      throw new MangaAlreadyExist(id);
    }

    const insertedId = await this.mangaRepository.add(data);

    return insertedId;
  }
}
