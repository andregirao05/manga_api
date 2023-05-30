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
} from "../useCases/mangas";
import { IChapter, IManga, IUpdate } from "../entities";

export interface MangaPage {
  mangas: IManga[];
  currentPage: number;
  totalPages: number;
}

export interface IMangaRepository {
  get(data: IGetMangaDTO): Promise<IManga>;
  getChapters(data: IGetChaptersDTO): Promise<IChapter[]>;
  getChapterNames(data: IGetChapterNamesDTO): Promise<string[]>;
  getSingleChapter(data: IGetSingleChapterDTO): Promise<IChapter>;
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
