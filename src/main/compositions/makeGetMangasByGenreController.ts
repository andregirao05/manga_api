import { GerMangasByGenreController } from "../../controllers";
import { db } from "../../database";

export function makeGetMangasByGenreController(): GerMangasByGenreController {
  return new GerMangasByGenreController(db);
}
