import { Router } from "express";
import { adaptRoute } from "./routAdapt";
import { makeGetMangaController } from "./compositions/makeGetMangaController";

const router = Router();

router.get("/mangas/:id", adaptRoute(makeGetMangaController()));

export { router };
