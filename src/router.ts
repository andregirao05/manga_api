import { Router } from "express";
import { adaptRoute } from "./adaptRoute";
import { 
  getChaptersController, 
  getMangaController, 
  getChapterNamesController, 
  searchMangasController, 
  getPopularMangasController,
  getLatestUpdatedMangasController,
  getGenreNamesController,
  getMangasByGenreController
} from "./useCases";
import { getSingleChapterController } from "./useCases/getSingleChapter";

const router = Router();

router.get("/mangas/get/:id", adaptRoute(getMangaController));
router.get("/mangas/get/:id/list-chapters", adaptRoute(getChaptersController));

router.get("/mangas/get/:id/chapter-names", adaptRoute(getChapterNamesController));
router.get("/mangas/get/:id/chapters/:chapterName", adaptRoute(getSingleChapterController));

router.get("/mangas/search/:origin/:searchTerm",adaptRoute(searchMangasController));
router.get("/info/populars/:origin", adaptRoute(getPopularMangasController));
router.get("/info/updates/:origin",adaptRoute(getLatestUpdatedMangasController));

router.get("/genres/list/:language", adaptRoute(getGenreNamesController));
router.get("/genres/get/:genreName",adaptRoute(getMangasByGenreController));

export { router };
