import { mangaRespository } from "../../repositories";
import { AddChaptersController } from "./AddChaptersController";
import { AddChaptersUseCase } from "./AddChaptersUseCase";

const addChaptersUseCase = new AddChaptersUseCase(mangaRespository);
const addChaptersController = new AddChaptersController(addChaptersUseCase);

export { addChaptersController };

export * from "./IAddChaptersDTO";
