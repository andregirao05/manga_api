import { GetSingleChapterController } from "../../controllers";
import { db } from "../../database";

export function makeGetSingleChapterController(): GetSingleChapterController {
  return new GetSingleChapterController(db);
}
