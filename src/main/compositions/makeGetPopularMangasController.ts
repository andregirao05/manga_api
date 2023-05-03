import { GetPopularMangasController } from "../../controllers";
import { db } from "../../database";

export function makeGetPopularMangasController(): GetPopularMangasController {
  const origins = ["readm", "manga_livre"];
  return new GetPopularMangasController(db, origins);
}
