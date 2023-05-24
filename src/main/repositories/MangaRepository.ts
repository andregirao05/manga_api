import { ObjectId } from "mongodb";
import { IMangaRepository } from "../../application/repositories";

import {
  IAddChapterDTO,
  IAddMangaDTO,
  IAddUpdateDTO,
  IGetChapterNamesDTO,
  IGetChaptersDTO,
  IGetGenreNamesDTO,
  IGetLatestUpdatedMangasDTO,
  IGetMangaDTO,
  IGetMangasByGenreDTO,
  IGetPopularMangasDTO,
  IGetSingleChapterDTO,
  IMangaExistDTO,
  ISearchMangasDTO,
  ISetUpdateDTO,
} from "../../domain/models";

import { MangaModel, MangaSchema, UpdateSchema } from "./Schemas";

import { model, disconnect, connect, Model } from "mongoose";
import {
  Chapter,
  IMangaWithChapters,
  Manga,
  Update,
} from "../../domain/entities";
import { MangaPage } from "../../application/repositories/IMangaRepository";

class MangaRepository implements IMangaRepository {
  private MangaModel: MangaModel;
  private UpdateModel: Model<Update>;

  constructor(private readonly mangasPerPage: number = 20) {
    this.MangaModel = model<IMangaWithChapters>(
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
    const [results] = await this.MangaModel.aggregate([
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

    const names = results?.chapterNames;

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

  async getGenreNames(data: IGetGenreNamesDTO): Promise<string[]> {
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

  async add(data: IAddMangaDTO): Promise<string> {
    const results = await this.MangaModel.collection.insertOne(data);
    return results.insertedId.toString();
  }

  async addChapter(data: IAddChapterDTO): Promise<boolean> {
    const { id, name, pages } = data;

    const results = await this.MangaModel.collection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $push: {
          chapters: { name, pages },
        },
      }
    );

    return results.modifiedCount > 0;
  }

  async addUpdate(data: IAddUpdateDTO): Promise<string> {
    const results = await this.UpdateModel.collection.insertOne(data);
    return results.insertedId.toString();
  }

  async setUpdate(data: ISetUpdateDTO): Promise<boolean> {
    const { origin, latest_updates, populars } = data;

    const results = await this.UpdateModel.collection.updateOne(
      { origin },
      {
        $set: {
          origin,
          latest_updates,
          populars,
        },
      }
    );

    return results.modifiedCount > 0;
  }

  async updateExists(origin: string): Promise<boolean> {
    const results = await this.UpdateModel.findOne(
      {
        origin: origin,
      },
      { projection: { _id: 1 } }
    );

    return results !== null;
  }

  async mangaExistsByInfo(data: IMangaExistDTO): Promise<string> {
    const results = await this.MangaModel.findOne(
      {
        title: data.title,
        origin: data.origin,
        language: data.language,
      },
      { projection: { _id: 1 } }
    );

    return results?._id.toString() || null;
  }

  async mangaExistsById(id: string): Promise<boolean> {
    const results = await this.MangaModel.findOne(
      {
        _id: new ObjectId(id),
      },
      { projection: { _id: 1 } }
    );

    return results !== null;
  }
}

export const mangaRespository = new MangaRepository();
