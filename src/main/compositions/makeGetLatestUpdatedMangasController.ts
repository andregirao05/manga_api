import { GetLatestUpdatedMangasController } from "../../controllers";
import { db } from "../../database";

export function makeGetLatestUpdatedMangasController(): GetLatestUpdatedMangasController {
  const origins = ["readm", "manga_livre"];
  return new GetLatestUpdatedMangasController(db, origins);
}
