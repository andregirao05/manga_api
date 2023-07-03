import { Validator } from "validation";
import { informationsRespository } from "repositories";
import { GetUpdateController } from "./GetUpdateController";
import { GetUpdateUseCase } from "./GetUpdateUseCase";
import { IGetUpdateDTO } from "./IGetUpdateDTO";
import { getUpdateSchema } from "./getUpdateSchema";

const getUpdateUseCase = new GetUpdateUseCase(informationsRespository);
const getUpdateValidator = new Validator<IGetUpdateDTO>(getUpdateSchema);
const getUpdateController = new GetUpdateController(
  getUpdateUseCase,
  getUpdateValidator
);

export { getUpdateController };

export * from "./IGetUpdateDTO";
