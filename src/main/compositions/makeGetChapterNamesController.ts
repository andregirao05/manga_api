import { GetChapterNamesController } from "../../controllers";
import { db } from "../../database";

export function makeGetChapterNamesController(): GetChapterNamesController {
  return new GetChapterNamesController(db);
}
