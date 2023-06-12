import { mangaRespository } from "repositories";
import { AddUpdateController } from "./AddUpdateController";
import { AddUpdateUseCase } from "./AddUpdateUseCase";
import { Validator } from "validation";
import { IAddUpdateDTO } from "./IAddUpdateDTO";
import { addUpdateSchema } from "./addUpdateSchema";

const addUpdateUseCase = new AddUpdateUseCase(mangaRespository);
const addUpdateValidator = new Validator<IAddUpdateDTO>(addUpdateSchema);
const addUpdateController = new AddUpdateController(
  addUpdateUseCase,
  addUpdateValidator
);

export { addUpdateController };

export * from "./IAddUpdateDTO";
