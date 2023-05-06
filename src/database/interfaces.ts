import { IChapter, IManga } from "../entities";

export interface IMangaWithoutChapters extends Omit<IManga, "chapters"> {}

export interface IDatabase {
  connect(url: string): Promise<void>;
  disconnect(): Promise<void>;
  get(id: string): Promise<IMangaWithoutChapters | null>;
  getChapters(id: string): Promise<IChapter[] | null>;
  getChapterNames(id: string): Promise<string[] | null>;
  getSingleChapter(id: string, chapterName: string): Promise<IChapter | null>;
  search(
    origin: string,
    searchText: string
  ): Promise<IMangaWithoutChapters[] | null>;
  listGenres(lang: "english" | "portuguese"): Promise<string[] | null>;
  getMangasByGenre(genre: string): Promise<IMangaWithoutChapters[] | null>;
  getPopulars(siteOrigin: string): Promise<IMangaWithoutChapters[] | null>;
  getLatestUpdated(siteOrigin: string): Promise<IMangaWithoutChapters[] | null>;
  exists(id: string): Promise<boolean>;
}
