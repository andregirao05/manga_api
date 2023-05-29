import { mangaRespository } from "../../repositories";
import { GetUpdateController } from "./GetUpdateController";
import { GetUpdateUseCase } from "./GetUpdateUseCase";

const getUpdateUseCase = new GetUpdateUseCase(mangaRespository);
const getUpdateController = new GetUpdateController(getUpdateUseCase);

export { getUpdateController };

export * from "./IGetUpdateDTO";
