import { mangaRespository } from "repositories";
import { Validator } from "validation";
import { AddChaptersController } from "./AddChaptersController";
import { AddChaptersUseCase } from "./AddChaptersUseCase";
import { addChaptersSchema } from "./AddChaptersSchema";
import { IAddChaptersDTO } from "./IAddChaptersDTO";

const addChaptersUseCase = new AddChaptersUseCase(mangaRespository);
const addChaptersValidator = new Validator<IAddChaptersDTO>(addChaptersSchema);
const addChaptersController = new AddChaptersController(
  addChaptersUseCase,
  addChaptersValidator
);

export { addChaptersController };

export * from "./IAddChaptersDTO";
