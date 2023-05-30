import { IUpdate } from "../../../entities";
import { UpdateNotFoundError } from "../../../errors";
import { IMangaRepository } from "../../../repositories";
import { IResults } from "../../IResults";
import { IUseCase } from "../../IUseCase";
import { IGetUpdateDTO } from "./IGetUpdateDTO";

export class GetUpdateUseCase
  implements IUseCase<IGetUpdateDTO, IResults<IUpdate>>
{
  constructor(private readonly mangaRepository: IMangaRepository) {}

  async execute(data: IGetUpdateDTO): Promise<IResults<IUpdate>> {
    const { origin } = data;

    const updateInfo = await this.mangaRepository.getUpdate({
      origin,
    });

    if (!updateInfo) {
      throw new UpdateNotFoundError(origin);
    }

    return {
      data: updateInfo,
    };
  }
}
