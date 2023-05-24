import { Chapter } from "./chapter";
import { Manga } from "./manga";

export interface IMangaWithChapters extends Manga {
  chapters: Chapter[];
}
