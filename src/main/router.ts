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

const router = Router();

router.get("/mangas/get/:id", adaptRoute(makeGetMangaController()));

router.get(
  "/info/populars/:origin",
  adaptRoute(makeGetPopularMangasController())
);

router.get(
  "/info/updates/:origin",
  adaptRoute(makeGetLatestUpdatedMangasController())
);

router.get(
  "/mangas/get/:id/list-chapters",
  adaptRoute(makeGetChaptersController())
);

router.get(
  "/mangas/get/:id/chapter-names",
  adaptRoute(makeGetChapterNamesController())
);

router.get(
  "/mangas/get/:id/chapters/:chapterName",
  adaptRoute(makeGetSingleChapterController())
);

router.get(
  "/mangas/search/:searchTerm",
  adaptRoute(makeSearchMangasController())
);

router.get("/genres/list/:language", adaptRoute(makeGetGenreNamesController()));

router.get(
  "/genres/get/:genreName",
  adaptRoute(makeGetMangasByGenreController())
);

export { router };
