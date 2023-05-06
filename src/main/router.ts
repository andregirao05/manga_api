import { Router } from "express";
import { adaptRoute } from "./adaptRoute";
import {
  makeGetMangaController,
  makeGetPopularMangasController,
  makeGetLatestUpdatedMangasController,
  makeGetChaptersController,
  makeGetChapterNamesController,
  makeGetSingleChapterController,
  makeSearchMangasController,
  makeGetGenreNamesController,
  makeGetMangasByGenreController,
} from "./compositions";
import { verifyRequiredParamsMiddleware } from "./middlewares";

const router = Router();

router.get(
  "/mangas/get/:id",
  verifyRequiredParamsMiddleware(["id"]),
  adaptRoute(makeGetMangaController())
);

router.get(
  "/info/populars/:origin",
  verifyRequiredParamsMiddleware(["origin"]),
  adaptRoute(makeGetPopularMangasController())
);

router.get(
  "/info/updates/:origin",
  verifyRequiredParamsMiddleware(["origin"]),
  adaptRoute(makeGetLatestUpdatedMangasController())
);

router.get(
  "/mangas/get/:id/list-chapters",
  verifyRequiredParamsMiddleware(["id"]),
  adaptRoute(makeGetChaptersController())
);

router.get(
  "/mangas/get/:id/chapter-names",
  verifyRequiredParamsMiddleware(["id"]),
  adaptRoute(makeGetChapterNamesController())
);

router.get(
  "/mangas/get/:id/chapters/:chapterName",
  verifyRequiredParamsMiddleware(["id", "chapterName"]),
  adaptRoute(makeGetSingleChapterController())
);

router.get(
  "/mangas/search/:origin/:searchTerm",
  verifyRequiredParamsMiddleware(["origin", "searchTerm"]),
  adaptRoute(makeSearchMangasController())
);

router.get(
  "/genres/list/:language",
  verifyRequiredParamsMiddleware(["language"]),
  adaptRoute(makeGetGenreNamesController())
);

router.get(
  "/genres/get/:genreName",
  verifyRequiredParamsMiddleware(["genreName"]),
  adaptRoute(makeGetMangasByGenreController())
);

export { router };
