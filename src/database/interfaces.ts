import { IManga } from "../entities";

export interface IDatabase {
  connect: (url: string) => Promise<void>;
  disconnect: () => Promise<void>;
  get: (id: string) => Promise<IManga | null>;
  search: (searchText: string) => Promise<IManga[] | null>;
  listGenres: (lang: "english" | "portuguse") => Promise<string[] | null>;
  getMangasByGenre: (genre: string) => Promise<IManga[] | null>;
  getPopulars: (siteOrigin: string) => Promise<IManga[] | null>;
  getLatestUpdated: (siteOrigin: string) => Promise<IManga[] | null>;
  exists: (id: string) => Promise<boolean>;
}
