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
  getMangasByGenreController,
  getSingleChapterController,
  addMangaController,
  addUpdateController,
  setUpdateController,
  getUpdateController,
  mangaExistsController,
} from "./useCases";
import { addChaptersController } from "./useCases";

const router = Router();

router.get("/mangas/get/:id", adaptRoute(getMangaController));
router.get("/mangas/get/:id/list-chapters", adaptRoute(getChaptersController));

router.get(
  "/mangas/get/:id/chapter-names",
  adaptRoute(getChapterNamesController)
);
router.get(
  "/mangas/get/:id/chapters/:chapterName",
  adaptRoute(getSingleChapterController)
);

router.get(
  "/mangas/search/:origin/:searchTerm/:page",
  adaptRoute(searchMangasController)
);
router.get(
  "/info/populars/:origin/:page",
  adaptRoute(getPopularMangasController)
);
router.get(
  "/info/updates/:origin/:page",
  adaptRoute(getLatestUpdatedMangasController)
);

router.get("/genres/list/:language", adaptRoute(getGenreNamesController));
router.get(
  "/genres/get/:genreName/:page",
  adaptRoute(getMangasByGenreController)
);

router.post("/mangas/exist", adaptRoute(mangaExistsController));
router.post("/mangas/add", adaptRoute(addMangaController));
router.post("/chapters/add", adaptRoute(addChaptersController));

router.post("/info/add", adaptRoute(addUpdateController));
router.post("/info/set", adaptRoute(setUpdateController));
router.get("/info/get/:origin", adaptRoute(getUpdateController));

export { router };
