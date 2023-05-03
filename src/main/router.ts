import { Router } from "express";
import { adaptRoute } from "./adaptRoute";
import {
  makeGetMangaController,
  makeGetPopularMangasController,
  makeGetLatestUpdatedMangasController,
} from "./compositions";

const router = Router();

router.get("/mangas/:id", adaptRoute(makeGetMangaController()));

router.get(
  "/mangas/populars/:origin",
  adaptRoute(makeGetPopularMangasController())
);

router.get(
  "/mangas/updates/:origin",
  adaptRoute(makeGetLatestUpdatedMangasController())
);

export { router };
