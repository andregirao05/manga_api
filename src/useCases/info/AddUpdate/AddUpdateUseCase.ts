import { UpdateAlreadyRegisteredError } from "errors";
import { IInformationsRepository } from "repositories";
import { IUseCase } from "protocols";
import { IAddUpdateDTO } from "./IAddUpdateDTO";

export class AddUpdateUseCase implements IUseCase<IAddUpdateDTO, string> {
  constructor(private readonly infoRepository: IInformationsRepository) {}

  async execute(data: IAddUpdateDTO): Promise<string> {
    const { origin, language, populars } = data;

    const updateExist = await this.infoRepository.exists(origin);

    if (updateExist) {
      throw new UpdateAlreadyRegisteredError(origin);
    }

    const insertedId = await this.infoRepository.add({
      origin,
      language,
      populars,
    });

    return insertedId;
  }
}
