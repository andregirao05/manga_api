import { WithId } from "mongodb";
import { Chapter } from "../entities";

export interface IManga {
  title: string;
  alternative_title: string;
  author: string;
  artist: string;
  status: string;
  url: string;
  origin: string;
  language: "english" | "portuguse";
  thumbnail: string;
  genres: string[];
  summary: string;
  chapters: Chapter[];
}

export interface IUpdate {
  origin: string;
  populars: string[];
  latest_updates: string[];
}

export type DbManga = WithId<IManga>;

export interface IDatabase {
  get: (id: string) => Promise<DbManga | null>;
  search: (searchText: string) => Promise<DbManga[]>;
  listGenres: (lang: "english" | "portuguse") => Promise<string[]>;
  getMangasByGenre: (genre: string) => Promise<DbManga[]>;
  getPopulars: (siteOrigin: string) => Promise<DbManga[]>;
  getLatestUpdated: (siteOrigin: string) => Promise<DbManga[]>;
}
