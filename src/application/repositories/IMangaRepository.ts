import {
  IGetChapterNamesDTO,
  IGetChaptersDTO,
  IGetGenreNamesDTO,
  IGetLatestUpdatedMangasDTO,
  IGetMangaDTO,
  IGetMangasByGenreDTO,
  IGetPopularMangasDTO,
  IGetSingleChapterDTO,
  IResultsDTO,
  IResultsWithPageInfoDTO,
  ISearchMangasDTO,
} from "../../domain/DTOs";

export interface IMangaRepository {
  connect(url: string): Promise<void>;
  disconnect(): Promise<void>;
  get(data: IGetMangaDTO): Promise<IResultsDTO>;
  getChapters(data: IGetChaptersDTO): Promise<IResultsDTO>;
  getChapterNames(data: IGetChapterNamesDTO): Promise<IResultsDTO>;
  getSingleChapter(data: IGetSingleChapterDTO): Promise<IResultsDTO>;
  search(data: ISearchMangasDTO): Promise<IResultsWithPageInfoDTO>;
  listGenres(data: IGetGenreNamesDTO): Promise<IResultsDTO>;
  getMangasByGenre(
    data: IGetMangasByGenreDTO
  ): Promise<IResultsWithPageInfoDTO>;
  getPopulars(data: IGetPopularMangasDTO): Promise<IResultsWithPageInfoDTO>;
  getLatestUpdated(
    data: IGetLatestUpdatedMangasDTO
  ): Promise<IResultsWithPageInfoDTO>;
  exists(id: string): Promise<boolean>;
}
