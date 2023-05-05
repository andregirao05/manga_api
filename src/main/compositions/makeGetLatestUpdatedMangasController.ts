import { GetLatestUpdatedMangasController } from "../../controllers";
import { db } from "../../database";
import { acceptedOrigins } from "../configs";

export function makeGetLatestUpdatedMangasController(): GetLatestUpdatedMangasController {
  const origins = acceptedOrigins;
  return new GetLatestUpdatedMangasController(db, origins);
}
