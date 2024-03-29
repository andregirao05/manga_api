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
  addChaptersController,
  authenticateController,
  addRecommendationsController,
  getRecommendationsController,
  getAdultGenreNamesController,
  getGenresController,
} from "./useCases";
import { authMiddleware } from "./middlewares";

const router = Router();

//Mangas routes
router.get("/mangas/get/:id", authMiddleware, adaptRoute(getMangaController));

router.get(
  "/mangas/search/:origin/:searchTerm/:page",
  authMiddleware,
  adaptRoute(searchMangasController)
);

router.get(
  "/mangas/populars/:origin/:page",
  authMiddleware,
  adaptRoute(getPopularMangasController)
);

router.get(
  "/mangas/latest-updates/:origin/:page",
  authMiddleware,
  adaptRoute(getLatestUpdatedMangasController)
);

router.get(
  "/mangas/by-genre/:origin/:genreName/:page",
  authMiddleware,
  adaptRoute(getMangasByGenreController)
);

router.post("/mangas/add", authMiddleware, adaptRoute(addMangaController));

router.post(
  "/mangas/exists",
  authMiddleware,
  adaptRoute(mangaExistsController)
);

router.post(
  "/mangas/recommendations",
  authMiddleware,
  adaptRoute(addRecommendationsController)
);

router.get(
  "/mangas/recommendations/:origin/:page",
  authMiddleware,
  adaptRoute(getRecommendationsController)
);

//Chapters Routes

router.get(
  "/chapters/names/:id",
  authMiddleware,
  adaptRoute(getChapterNamesController)
);

router.get(
  "/chapters/all/:id",
  authMiddleware,
  adaptRoute(getChaptersController)
);

router.get(
  "/chapters/get/:id/:chapterName",
  authMiddleware,
  adaptRoute(getSingleChapterController)
);

router.post("/chapters/add", authMiddleware, adaptRoute(addChaptersController));

//Genre routes

router.get(
  "/genres/names/:origin",
  authMiddleware,
  adaptRoute(getGenreNamesController)
);

router.get(
  "/genres/adult-names/:origin",
  authMiddleware,
  adaptRoute(getAdultGenreNamesController)
);

router.get(
  "/genres/get/:origin",
  authMiddleware,
  adaptRoute(getGenresController)
);

//Info routes

router.get(
  "/info/get/:origin",
  authMiddleware,
  adaptRoute(getUpdateController)
);

router.post("/info/add", authMiddleware, adaptRoute(addUpdateController));
router.post("/info/update", authMiddleware, adaptRoute(setUpdateController));

//User routes

router.post("/users/auth", adaptRoute(authenticateController));

export { router };
