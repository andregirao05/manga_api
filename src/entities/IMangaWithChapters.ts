import { IChapter } from "./chapter";
import { IManga } from "./manga";

export interface IMangaWithChapters extends IManga {
  chapters: IChapter[];
}
