import { IMangaWithChapters } from "entities";

export interface IAddMangaDTO extends Omit<IMangaWithChapters, "id"> {}
