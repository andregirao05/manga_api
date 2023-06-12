import { IChapter } from "entities";

export interface IAddChaptersDTO {
  id: string;
  chapters: IChapter[];
}
