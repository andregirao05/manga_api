import {
  IAddChaptersDTO,
  IAddMangaDTO,
  IGetChapterNamesDTO,
  IGetChaptersDTO,
  IGetGenreNamesDTO,
  IGetLatestUpdatedMangasDTO,
  IGetMangaDTO,
  IGetMangasByGenreDTO,
  IGetPopularMangasDTO,
  IGetSingleChapterDTO,
  ISearchMangasDTO,
  IMangaExistsDTO,
  IAddUpdateDTO,
  ISetUpdateDTO,
  IGetUpdateDTO,
} from "../useCases";
import { Chapter, IUpdate, Manga } from "../entities";

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
  getGenreNames(data: IGetGenreNamesDTO): Promise<string[]>;
  getMangasByGenre(data: IGetMangasByGenreDTO): Promise<MangaPage>;
  getPopulars(data: IGetPopularMangasDTO): Promise<MangaPage>;
  getLatestUpdated(data: IGetLatestUpdatedMangasDTO): Promise<MangaPage>;

  add(data: IAddMangaDTO): Promise<string>;
  addChapters(data: IAddChaptersDTO): Promise<boolean>;

  addUpdate(data: IAddUpdateDTO): Promise<string>;
  getUpdate(data: IGetUpdateDTO): Promise<IUpdate>;
  setUpdate(data: ISetUpdateDTO): Promise<boolean>;

  updateExists(origin: string): Promise<boolean>;

  mangaExistsByInfo(data: IMangaExistsDTO): Promise<string>;
  mangaExistsById(id: string): Promise<boolean>;
  mangaExistByUrl(url: string): Promise<boolean>;
}
