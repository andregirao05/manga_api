import { IUpdate } from "entities";
import { UpdateNotFoundError } from "errors";
import { IInformationsRepository } from "repositories";
import { IUseCase } from "protocols";
import { IGetUpdateDTO } from "./IGetUpdateDTO";

export class GetUpdateUseCase implements IUseCase<IGetUpdateDTO, IUpdate> {
  constructor(private readonly infoRepository: IInformationsRepository) {}

  async execute(data: IGetUpdateDTO): Promise<IUpdate> {
    const { origin } = data;

    const updateInfo = await this.infoRepository.get({
      origin,
    });

    if (!updateInfo) {
      throw new UpdateNotFoundError(origin);
    }

    return updateInfo;
  }
}
