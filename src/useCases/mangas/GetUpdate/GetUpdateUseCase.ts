import { IUpdate } from "../../../entities";
import { UpdateNotFoundError } from "../../../errors";
import { IMangaRepository } from "../../../repositories";
import { IUseCase } from "../../../protocols/IUseCase";
import { IGetUpdateDTO } from "./IGetUpdateDTO";

export class GetUpdateUseCase implements IUseCase<IGetUpdateDTO, IUpdate> {
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: IGetUpdateDTO): Promise<IUpdate> {
    const { origin } = data;

    const updateInfo = await this.mangaRepository.getUpdate({
      origin,
    });

    if (!updateInfo) {
      throw new UpdateNotFoundError(origin);
    }

    return updateInfo;
  }
}
