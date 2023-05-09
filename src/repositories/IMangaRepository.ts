import { Manga, Chapter } from "../entities";

export interface IMangaRepository {
  connect(url: string): Promise<void>;
  disconnect(): Promise<void>;
  get(id: string): Promise<Manga | null>;
  getChapters(id: string): Promise<Chapter[]>;
  getChapterNames(id: string): Promise<string[]>;
  getSingleChapter(id: string, chapterName: string): Promise<Chapter>;
  search(origin: string, searchText: string): Promise<Manga[]>;
  listGenres(lang: string): Promise<string[]>;
  getMangasByGenre(genre: string): Promise<Manga[]>;
  getPopulars(siteOrigin: string): Promise<Manga[]>;
  getLatestUpdated(siteOrigin: string): Promise<Manga[]>;
  exists(id: string): Promise<boolean>;
}
