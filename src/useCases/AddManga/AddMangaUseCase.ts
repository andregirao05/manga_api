import { IAddMangaDTO } from "./IAddMangaDTO";
import { IResults } from "../IResults";
import { MangaAlreadyExist } from "../../errors";
import { IMangaRepository } from "../../repositories";
import { IUseCase } from "../IUseCase";

export class AddMangaUseCase
  implements IUseCase<IAddMangaDTO, IResults<string>>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: IAddMangaDTO): Promise<IResults<string>> {
    const id = await this.mangaRepository.mangaExistsByInfo({
      url: data.url,
    });

    if (id) {
      throw new MangaAlreadyExist(id);
    }

    const insertedId = await this.mangaRepository.add(data);

    return {
      data: insertedId,
    };
  }
}
