export interface IDatabase {
  get: (id: string) => Promise<IManga | null>;
  search: (searchText: string) => Promise<IManga[]>;
  listGenres: (lang: "english" | "portuguse") => Promise<string[]>;
  getMangasByGenre: (genre: string) => Promise<IManga[]>;
  getPopulars: (siteOrigin: string) => Promise<IManga[]>;
  getLatestUpdated: (siteOrigin: string) => Promise<IManga[]>;
}
