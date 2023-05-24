import { Request, Response } from "express";
import {
  MangaAlreadyExist,
  MissingParamError,
  ServerError,
} from "../../errors";
import { badRequest, conflict, ok, serverError } from "../../helpers";
import { IController } from "../IController";
import { AddMangaUseCase } from "./AddMangaUseCase";
import { verifyRequiredFields } from "../../validate";

export class AddMangaController implements IController {
  constructor(private readonly addMangaUseCase: AddMangaUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { body } = request;

      const missingFields = verifyRequiredFields(body, [
        "title",
        "alternative_title",
        "artist",
        "author",
        "status",
        "url",
        "thumbnail",
        "origin",
        "language",
        "genres",
        "rating",
        "summary",
        "chapters",
      ]);

      if (missingFields.length > 0) {
        return badRequest(response, new MissingParamError(missingFields));
      }

      const results = await this.addMangaUseCase.execute({
        title: body.title,
        alternative_title: body.alternative_title,
        artist: body.artist,
        author: body.author,
        status: body.status,
        url: body.url,
        thumbnail: body.thumbnail,
        origin: body.origin,
        language: body.language,
        genres: body.genres,
        rating: body.rating,
        summary: body.summary,
        chapters: body.chapters,
      });

      return ok(response, results);
    } catch (error) {
      console.log(error);

      if (error instanceof MangaAlreadyExist) {
        return conflict(response, error);
      }

      return serverError(response, new ServerError("Unexpected Error"));
    }
  }
}
