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


//Mangas routes
router.get("/mangas/get", authMiddleware, adaptRoute(getMangaController));

router.get(
  "/mangas/search",
  authMiddleware,
  adaptRoute(searchMangasController)
);

router.get(
  "/mangas/populars",
  authMiddleware,
  adaptRoute(getPopularMangasController)
);

router.get(
  "/mangas/latest-updates",
  authMiddleware,
  adaptRoute(getLatestUpdatedMangasController)
);

router.get(
  "/mangas/by-genre",
  authMiddleware,
  adaptRoute(getMangasByGenreController)
  );
  
router.post("/mangas/add", authMiddleware, adaptRoute(addMangaController));

router.post("/mangas/exists", authMiddleware, adaptRoute(mangaExistsController));


//Chapters Routes

router.get(
  "/chapters/names",
  authMiddleware,
  adaptRoute(getChapterNamesController)
);

router.get(
  "/chapters/all",
  authMiddleware,
  adaptRoute(getChaptersController)
);

router.get(
  "/chapters/get",
  authMiddleware,
  adaptRoute(getSingleChapterController)
);

router.post("/chapters/add", authMiddleware, adaptRoute(addChaptersController));


//Genre routes

router.get(
  "/genres/names",
  authMiddleware,
  adaptRoute(getGenreNamesController)
);


//Info routes

router.get(
  "/info/get",
  authMiddleware,
  adaptRoute(getUpdateController)
);

router.post("/info/set", authMiddleware, adaptRoute(addUpdateController));
router.post("/info/update", authMiddleware, adaptRoute(setUpdateController));


//User routes

router.post("/auth", adaptRoute(authenticateController));


export { router };
