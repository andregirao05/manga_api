import { IInformationsRepository } from "repositories";
import { IUseCase } from "protocols";
import { ISetUpdateDTO } from "./ISetUpdateDTO";

export class SetUpdateUseCase implements IUseCase<ISetUpdateDTO, boolean> {
  constructor(private readonly infoRepository: IInformationsRepository) {}

  async execute(data: ISetUpdateDTO): Promise<boolean> {
    const { origin, language, latest_updates, populars } = data;

    const sucessful = await this.infoRepository.set({
      origin,
      language,
      latest_updates,
      populars,
    });

    return sucessful;
  }
}
