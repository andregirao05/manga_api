import { SearchMangasController } from "../../controllers";
import { db } from "../../database";

export function makeSearchMangasController(): SearchMangasController {
  return new SearchMangasController(db);
}
