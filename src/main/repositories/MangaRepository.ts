import { ObjectId } from "mongodb";
import { IMangaRepository } from "../../application/repositories";

import {
  IGetChapterNamesDTO,
  IGetChaptersDTO,
  IGetGenreNamesDTO,
  IGetLatestUpdatedMangasDTO,
  IGetMangaDTO,
  IGetMangasByGenreDTO,
  IGetPopularMangasDTO,
  IGetSingleChapterDTO,
  IResults,
  IResultsWithPageInfo,
  ISearchMangasDTO,
} from "../../domain/models";

import {
  MangaModel,
  MangaSchema,
  MangaWithChapters,
  UpdateSchema,
} from "./Schemas";

import {
  model,
  disconnect,
  connect,
  Model,
  Document as MongoDoc,
} from "mongoose";
import { Chapter, Manga, Update } from "../../domain/entities";
import { MangaPage } from "../../application/repositories/IMangaRepository";

export class MangaRepositoty implements IMangaRepository {
  private MangaModel: MangaModel;
  private UpdateModel: Model<Update>;

  constructor(private readonly mangasPerPage: number = 20) {
    this.MangaModel = model<MangaWithChapters>(
      "Manga",
      MangaSchema
    ) as MangaModel;
    this.UpdateModel = model("Update", UpdateSchema);
  }

  async connect(url: string): Promise<void> {
    await connect(url);
  }

  async disconnect(): Promise<void> {
    await disconnect();
  }

  async get(data: IGetMangaDTO): Promise<Manga> {
    const manga = await this.MangaModel.findOne({ _id: data.id }).select({
      chapters: 0,
    });

    return new Manga(manga.toObject(), manga._id.toString());
  }

  async getChapters(data: IGetChaptersDTO): Promise<Chapter[]> {
    const results = await this.MangaModel.findOne({ _id: data.id }).select({
      chapters: 1,
    });

    const chapters = results.chapters.map(
      (chapter: any) => new Chapter(chapter.toObject())
    );
    return chapters;
  }

  async getChapterNames(data: IGetChapterNamesDTO): Promise<string[]> {
    const results = await this.MangaModel.aggregate([
      {
        $match: {
          _id: new ObjectId(data.id),
        },
      },
      {
        $project: {
          _id: 0,
          chapterNames: {
            $map: {
              input: "$chapters",
              as: "chapters",
              in: "$$chapters.name",
            },
          },
        },
      },
    ]);

    const names = results[0].chapterNames;

    return names;
  }

  async getSingleChapter(data: IGetSingleChapterDTO): Promise<Chapter> {
    const results = await this.MangaModel.findOne({ _id: data.id }).select({
      _id: 0,
      chapters: { $elemMatch: { name: data.chapterName } },
    });

    const [chapter] = results.chapters;

    return new Chapter(chapter);
  }

  async search(data: ISearchMangasDTO): Promise<MangaPage> {
    const options = {
      page: data.page,
      limit: this.mangasPerPage,
      projection: { chapters: 0 },
    };

    const results = await this.MangaModel.paginate(
      {
        origin: data.origin,
        $text: { $search: `\"${data.searchTerm}\"` },
      },
      options
    );

    return {
      mangas: results.docs,
      currentPage: results.page,
      totalPages: results.totalPages,
    };
  }

  async listGenres(data: IGetGenreNamesDTO): Promise<string[]> {
    const genresNames = await this.MangaModel.distinct("genres", {
      language: data.language,
    });

    return genresNames;
  }

  async getMangasByGenre(data: IGetMangasByGenreDTO): Promise<MangaPage> {
    const options = {
      page: data.page,
      limit: this.mangasPerPage,
      projection: { chapters: 0 },
    };

    const results = await this.MangaModel.paginate(
      { genres: data.genreName },
      options
    );

    return {
      mangas: results.docs,
      currentPage: results.page,
      totalPages: results.totalPages,
    };
  }

  async getPopulars(data: IGetPopularMangasDTO): Promise<MangaPage> {
    const updateData = await this.UpdateModel.findOne({ origin: data.origin });

    const options = {
      page: data.page,
      limit: this.mangasPerPage,
      projection: { chapters: 0 },
    };

    const results = await this.MangaModel.paginate(
      {
        origin: data.origin,
        url: { $in: updateData.populars },
      },
      options
    );

    return {
      mangas: results.docs,
      currentPage: results.page,
      totalPages: results.totalPages,
    };
  }

  async getLatestUpdated(data: IGetLatestUpdatedMangasDTO): Promise<MangaPage> {
    const updateData = await this.UpdateModel.findOne({ origin: data.origin });

    const options = {
      page: data.page,
      limit: this.mangasPerPage,
      projection: { chapters: 0 },
    };

    const results = await this.MangaModel.paginate(
      {
        origin: data.origin,
        url: { $in: updateData.latest_updates },
      },
      options
    );

    return {
      mangas: results.docs,
      currentPage: results.page,
      totalPages: results.totalPages,
    };
  }

  async exists(id: string): Promise<boolean> {
    try {
      const results = await this.MangaModel.findOne(
        { _id: new ObjectId(id) },
        { projection: { chapters: 0 } }
      );
      return results !== null;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export const mangaRespository = new MangaRepositoty();
