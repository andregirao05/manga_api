import { ObjectId } from "mongodb";
import { IMangaRepository, MangaPage } from "./IMangaRepository";
import {
  Chapter,
  IMangaWithChapters,
  IUpdate,
  Manga,
  Update,
} from "../entities";
import {
  IAddChaptersDTO,
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
  IGetUpdateDTO,
  IMangaExistsDTO,
  ISearchMangasDTO,
  ISetUpdateDTO,
} from "../useCases";
import { MangaModel, MangaSchema, UpdateSchema } from "./Schemas";
import { model, disconnect, connect, Model } from "mongoose";

class MangaRepository implements IMangaRepository {
  private MangaModel: MangaModel;
  private UpdateModel: Model<IUpdate>;

  constructor(private readonly mangasPerPage: number = 20) {
    this.MangaModel = model<IMangaWithChapters>(
      "Manga",
      MangaSchema
    ) as MangaModel;
    this.UpdateModel = model<IUpdate>("Update", UpdateSchema);
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

    const chapters = results?.chapters.map(
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

    return results?.chapters[0];
  }

  async search(data: ISearchMangasDTO): Promise<MangaPage> {
    const options = {
      page: data.page,
      limit: this.mangasPerPage,
      projection: { chapters: 0 },
    };

    const term = `\"${data.searchTerm}\"`;

    const results = await this.MangaModel.paginate(
      {
        origin: data.origin,
        $text: { $search: term },
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
        url: { $in: updateData?.populars },
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

  async addChapters(data: IAddChaptersDTO): Promise<boolean> {
    const { id, chapters } = data;

    const results = await this.MangaModel.collection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $push: {
          chapters: { $each: chapters },
        },
      }
    );

    return results.modifiedCount > 0;
  }

  async addUpdate(data: IAddUpdateDTO): Promise<string> {
    const results = await this.UpdateModel.collection.insertOne(data);
    return results.insertedId.toString();
  }

  async getUpdate(data: IGetUpdateDTO): Promise<IUpdate> {
    const { origin } = data;
    const results = await this.UpdateModel.findOne({ origin });
    return results;
  }

  async setUpdate(data: ISetUpdateDTO): Promise<boolean> {
    const { origin, language, latest_updates, populars } = data;

    const results = await this.UpdateModel.collection.updateOne(
      {
        origin,
      },
      {
        $set: {
          origin,
          language,
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

  async mangaExistsByInfo(data: IMangaExistsDTO): Promise<string> {
    const results = await this.MangaModel.findOne(
      {
        url: data.url,
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

  async mangaExistByUrl(url: string): Promise<boolean> {
    const results = await this.MangaModel.findOne(
      {
        url,
      },
      { projection: { _id: 1 } }
    );

    return results != null;
  }
}

export const mangaRespository = new MangaRepository();
