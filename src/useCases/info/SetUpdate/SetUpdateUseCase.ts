import { UpdateNotFoundError } from "errors";
import { IInformationsRepository } from "repositories";
import { IUseCase } from "protocols";
import { ISetUpdateDTO } from "./ISetUpdateDTO";

export class SetUpdateUseCase implements IUseCase<ISetUpdateDTO, boolean> {
  constructor(private readonly infoRepository: IInformationsRepository) {}

  async execute(data: ISetUpdateDTO): Promise<boolean> {
    const { origin, language, latest_updates, populars } = data;

    const updateExist = await this.infoRepository.exists(origin);

    if (!updateExist) {
      throw new UpdateNotFoundError(origin);
    }

    const wasInserted = await this.infoRepository.set({
      origin,
      language,
      latest_updates,
      populars,
    });

    return wasInserted;
  }
}
