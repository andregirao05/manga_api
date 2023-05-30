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
} from "./useCases/mangas";
import { addChaptersController } from "./useCases/mangas";
import { authenticateController } from "./useCases";
import { authMiddleware } from "./middlewares";

const router = Router();

router.get("/mangas/get/:id", authMiddleware, adaptRoute(getMangaController));
router.get(
  "/mangas/get/:id/list-chapters",
  authMiddleware,
  adaptRoute(getChaptersController)
);

router.get(
  "/mangas/get/:id/chapter-names",
  authMiddleware,
  adaptRoute(getChapterNamesController)
);
router.get(
  "/mangas/get/:id/chapters/:chapterName",
  authMiddleware,
  adaptRoute(getSingleChapterController)
);

router.get(
  "/mangas/search/:origin/:searchTerm/:page",
  authMiddleware,
  adaptRoute(searchMangasController)
);
router.get(
  "/info/populars/:origin/:page",
  authMiddleware,
  adaptRoute(getPopularMangasController)
);
router.get(
  "/info/updates/:origin/:page",
  authMiddleware,
  adaptRoute(getLatestUpdatedMangasController)
);

router.get(
  "/genres/list/:language",
  authMiddleware,
  adaptRoute(getGenreNamesController)
);
router.get(
  "/genres/get/:genreName/:page",
  authMiddleware,
  adaptRoute(getMangasByGenreController)
);

router.post("/mangas/exist", authMiddleware, adaptRoute(mangaExistsController));
router.post("/mangas/add", authMiddleware, adaptRoute(addMangaController));
router.post("/chapters/add", authMiddleware, adaptRoute(addChaptersController));

router.post("/info/add", authMiddleware, adaptRoute(addUpdateController));
router.post("/info/set", authMiddleware, adaptRoute(setUpdateController));
router.get(
  "/info/get/:origin",
  authMiddleware,
  adaptRoute(getUpdateController)
);

router.post("/auth", adaptRoute(authenticateController));

export { router };
