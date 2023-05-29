import { mangaRespository } from "../../repositories";
import { AddUpdateController } from "./AddUpdateController";
import { AddUpdateUseCase } from "./AddUpdateUseCase";

const addUpdateUseCase = new AddUpdateUseCase(mangaRespository);
const addUpdateController = new AddUpdateController(addUpdateUseCase);

export { addUpdateController };

export * from "./IAddUpdateDTO";
