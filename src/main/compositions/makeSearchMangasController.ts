import { SearchMangasController } from "../../controllers";
import { db } from "../../database";
import { acceptedOrigins } from "../configs";

export function makeSearchMangasController(): SearchMangasController {
  return new SearchMangasController(db, acceptedOrigins);
}
