import {
  IAddMangaDTO,
  IGetGenreNamesDTO,
  IGetLatestUpdatedMangasDTO,
  IGetMangaDTO,
  IGetMangasByGenreDTO,
  IGetPopularMangasDTO,
  ISearchMangasDTO,
  IMangaExistsDTO,
  IAddRecommendationsDTO,
  IGetRecommendationsDTO,
} from "useCases";
import { IManga } from "entities";

export interface IMangaPage {
  mangas: IManga[];
  currentPage: number;
  totalPages: number;
}

export interface IMangaRepository {
  get(data: IGetMangaDTO): Promise<IManga>;
  search(data: ISearchMangasDTO): Promise<IMangaPage>;
  getGenreNames(data: IGetGenreNamesDTO): Promise<string[]>;
  getByGenre(data: IGetMangasByGenreDTO): Promise<IMangaPage>;
  getPopulars(data: IGetPopularMangasDTO): Promise<IMangaPage>;
  getLatestUpdated(data: IGetLatestUpdatedMangasDTO): Promise<IMangaPage>;

  add(data: IAddMangaDTO): Promise<string>;

  mangaExistsByInfo(data: IMangaExistsDTO): Promise<string>;
  mangaExistsById(id: string): Promise<boolean>;
  mangaExistByUrl(url: string): Promise<boolean>;

  addRecommendations(data: IAddRecommendationsDTO): Promise<boolean>;
  getRecommendations(data: IGetRecommendationsDTO): Promise<IMangaPage>;
}
