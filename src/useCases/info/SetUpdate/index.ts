import { Validator } from "validation";
import { mangaRespository } from "repositories";
import { SetUpdateController } from "./SetUpdateController";
import { SetUpdateUseCase } from "./SetUpdateUseCase";
import { ISetUpdateDTO } from "./ISetUpdateDTO";
import { setUpdateSchema } from "./setUpdateSchema";

const setUpdateUseCase = new SetUpdateUseCase(mangaRespository);
const setUpdateValidator = new Validator<ISetUpdateDTO>(setUpdateSchema);
const setUpdateController = new SetUpdateController(
  setUpdateUseCase,
  setUpdateValidator
);

export { setUpdateController };

export * from "./ISetUpdateDTO";
