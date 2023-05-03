import { Router } from "express";
import { adaptRoute } from "./routAdapt";
import {
  makeGetMangaController,
  makeGetPopularMangasController,
} from "./compositions";

const router = Router();

router.get("/mangas/:id", adaptRoute(makeGetMangaController()));
router.get(
  "/mangas/populars/:origin",
  adaptRoute(makeGetPopularMangasController())
);

export { router };
