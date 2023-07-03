import {
  IAddChaptersDTO,
  IGetChapterNamesDTO,
  IGetChaptersDTO,
  IGetSingleChapterDTO,
} from "useCases";
import { IChapter } from "entities";

export interface IChapterRepository {
  get(data: IGetSingleChapterDTO): Promise<IChapter>;
  getAll(data: IGetChaptersDTO): Promise<IChapter[]>;
  getNames(data: IGetChapterNamesDTO): Promise<string[]>;
  addAll(data: IAddChaptersDTO): Promise<boolean>;
}
