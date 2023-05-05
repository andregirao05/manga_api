import { Router } from "express";
import { adaptRoute } from "./adaptRoute";
import {
  makeGetMangaController,
  makeGetPopularMangasController,
  makeGetLatestUpdatedMangasController,
  makeGetChaptersController,
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

export { router };
