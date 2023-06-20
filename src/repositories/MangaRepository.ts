import { ObjectId } from "mongodb";
import { IMangaRepository, IMangaPage } from "./IMangaRepository";
import {
  IManga,
  IMangaWithChapters,
  IUpdate,
  IChapter,
  IRecommendation,
} from "entities";
import {
  IAddChaptersDTO,
  IAddMangaDTO,
  IAddRecommendationsDTO,
  IAddUpdateDTO,
  IGetChapterNamesDTO,
  IGetChaptersDTO,
  IGetGenreNamesDTO,
  IGetLatestUpdatedMangasDTO,
  IGetMangaDTO,
  IGetMangasByGenreDTO,
  IGetPopularMangasDTO,
  IGetRecommendationsDTO,
  IGetSingleChapterDTO,
  IGetUpdateDTO,
  IMangaExistsDTO,
  ISearchMangasDTO,
  ISetUpdateDTO,
} from "useCases";
import {
  MangaModel,
  MangaSchema,
  RecommendationSchema,
  UpdateSchema,
} from "./MangaRepoSchemas";
import { model, Model } from "mongoose";

class MangaRepository implements IMangaRepository {
  private MangaModel: MangaModel;
  private UpdateModel: Model<IUpdate>;
  private RecommendationModel: Model<IRecommendation>;

  constructor(private readonly mangasPerPage: number = 20) {
    this.MangaModel = model<IMangaWithChapters>(
      "Manga",
      MangaSchema
    ) as MangaModel;
    this.UpdateModel = model<IUpdate>("Update", UpdateSchema);
    this.RecommendationModel = model<IRecommendation>(
      "Recommendation",
      RecommendationSchema
    );
  }

  async get(data: IGetMangaDTO): Promise<IManga> {
    const manga = await this.MangaModel.findOne({ _id: data.id }).select({
      chapters: 0,
    });

    return manga;
  }

  async getChapters(data: IGetChaptersDTO): Promise<IChapter[]> {
    const results = await this.MangaModel.findOne({ _id: data.id }).select({
      chapters: 1,
    });

    return results?.chapters;
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

  async getSingleChapter(data: IGetSingleChapterDTO): Promise<IChapter> {
    const results = await this.MangaModel.findOne({ _id: data.id }).select({
      _id: 0,
      chapters: { $elemMatch: { name: data.chapterName } },
    });

    return results?.chapters[0];
  }

  async search(data: ISearchMangasDTO): Promise<IMangaPage> {
    const options = {
      page: data.page,
      limit: this.mangasPerPage,
      projection: { chapters: 0 },
      sort: { score: { $meta: "textScore" } },
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

  async getMangasByGenre(data: IGetMangasByGenreDTO): Promise<IMangaPage> {
    const options = {
      page: data.page,
      limit: this.mangasPerPage,
      projection: { chapters: 0 },
    };

    const results = await this.MangaModel.paginate(
      { genres: data.genreName, origin: data.origin },
      options
    );

    return {
      mangas: results.docs,
      currentPage: results.page,
      totalPages: results.totalPages,
    };
  }

  async getPopulars(data: IGetPopularMangasDTO): Promise<IMangaPage> {
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

  async getLatestUpdated(
    data: IGetLatestUpdatedMangasDTO
  ): Promise<IMangaPage> {
    const updateData = await this.UpdateModel.findOne({ origin: data.origin });

    const options = {
      page: data.page,
      limit: this.mangasPerPage,
      projection: { chapters: 0 },
    };

    const results = await this.MangaModel.paginate(
      {
        origin: data.origin,
        url: { $in: updateData?.latest_updates },
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
    const {
      title,
      alternative_title,
      artist,
      author,
      origin,
      language,
      rating,
      status,
      summary,
      url,
      thumbnail,
      genres,
      chapters,
    } = data;

    const results = await this.MangaModel.collection.insertOne({
      title,
      alternative_title,
      artist,
      author,
      origin,
      language,
      rating,
      status,
      summary,
      url,
      thumbnail,
      genres,
      chapters,
    });
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
    const { origin, language, latest_updates, populars } = data;
    const results = await this.UpdateModel.collection.insertOne({
      origin,
      language,
      latest_updates,
      populars,
    });
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

  async addRecommendations(data: IAddRecommendationsDTO): Promise<boolean> {
    const results = await this.RecommendationModel.collection.updateOne(
      { origin: data.origin },
      { $set: { origin: data.origin, ids: data.ids } },
      { upsert: true }
    );
    return results.modifiedCount > 0 || results.upsertedCount > 0;
  }

  async getRecommendations(data: IGetRecommendationsDTO): Promise<IMangaPage> {
    const recomendationResults = await this.RecommendationModel.findOne({
      origin: data.origin,
    });

    const options = {
      page: data.page,
      limit: this.mangasPerPage,
      projection: { chapters: 0 },
    };

    const results = await this.MangaModel.paginate(
      {
        origin: data.origin,
        _id: { $in: recomendationResults?.ids },
      },
      options
    );

    return {
      mangas: results.docs,
      currentPage: results.page,
      totalPages: results.totalPages,
    };
  }
}

export const mangaRespository = new MangaRepository();
