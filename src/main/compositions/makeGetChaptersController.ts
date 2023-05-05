import { GetChaptersController } from "../../controllers";
import { db } from "../../database";

export function makeGetChaptersController(): GetChaptersController {
  return new GetChaptersController(db);
}
