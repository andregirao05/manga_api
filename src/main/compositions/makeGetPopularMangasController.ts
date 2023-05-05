import { GetPopularMangasController } from "../../controllers";
import { db } from "../../database";
import { acceptedOrigins } from "../configs";

export function makeGetPopularMangasController(): GetPopularMangasController {
  const origins = acceptedOrigins;
  return new GetPopularMangasController(db, origins);
}
