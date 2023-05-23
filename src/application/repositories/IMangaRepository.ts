import {
  IGetChapterNamesDTO,
  IGetChaptersDTO,
  IGetGenreNamesDTO,
  IGetLatestUpdatedMangasDTO,
  IGetMangaDTO,
  IGetMangasByGenreDTO,
  IGetPopularMangasDTO,
  IGetSingleChapterDTO,
  ISearchMangasDTO,
} from "../../domain/DTOs";
import { Chapter, Manga } from "../../domain/entities";

export interface MangaPage {
  mangas: Manga[];
  currentPage: number;
  totalPages: number;
}

export interface IMangaRepository {
  connect(url: string): Promise<void>;
  disconnect(): Promise<void>;
  get(data: IGetMangaDTO): Promise<Manga>;
  getChapters(data: IGetChaptersDTO): Promise<Chapter[]>;
  getChapterNames(data: IGetChapterNamesDTO): Promise<string[]>;
  getSingleChapter(data: IGetSingleChapterDTO): Promise<Chapter>;
  search(data: ISearchMangasDTO): Promise<MangaPage>;
  listGenres(data: IGetGenreNamesDTO): Promise<string[]>;
  getMangasByGenre(data: IGetMangasByGenreDTO): Promise<MangaPage>;
  getPopulars(data: IGetPopularMangasDTO): Promise<MangaPage>;
  getLatestUpdated(data: IGetLatestUpdatedMangasDTO): Promise<MangaPage>;
  exists(id: string): Promise<boolean>;
}
