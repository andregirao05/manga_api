import { mangaRespository } from "repositories";
import { GetChaptersUseCase } from "./GetChapterUseCase";
import { GetChaptersController } from "./GetChaptersController";
import { Validator } from "validation";
import { IGetChaptersDTO } from "./IGetChaptersDTO";
import { getChaptersSchema } from "./getChaptersSchema";

const getChaptersUseCase = new GetChaptersUseCase(mangaRespository);
const getChaptersValidator = new Validator<IGetChaptersDTO>(getChaptersSchema);
const getChaptersController = new GetChaptersController(
  getChaptersUseCase,
  getChaptersValidator
);

export * from "./IGetChaptersDTO";
export { getChaptersController };
