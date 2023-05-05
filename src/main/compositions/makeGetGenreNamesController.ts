import { GetGenreNamesController } from "../../controllers";
import { db } from "../../database";
import { acceptedLanguages } from "../configs";

export function makeGetGenreNamesController(): GetGenreNamesController {
  return new GetGenreNamesController(db, acceptedLanguages);
}
