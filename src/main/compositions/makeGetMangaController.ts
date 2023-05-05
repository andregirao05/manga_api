import { GetMangaController } from "../../controllers";
import { db } from "../../database";

export function makeGetMangaController(): GetMangaController {
  return new GetMangaController(db);
}
