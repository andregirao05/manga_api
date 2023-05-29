import { mangaRespository } from "../../repositories";
import { SetUpdateController } from "./SetUpdateController";
import { SetUpdateUseCase } from "./SetUpdateUseCase";

const setUpdateUseCase = new SetUpdateUseCase(mangaRespository);
const setUpdateController = new SetUpdateController(setUpdateUseCase);

export { setUpdateController };

export * from "./ISetUpdateDTO";
