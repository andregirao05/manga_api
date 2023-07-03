import { ObjectId } from "mongodb";
import { IMangaRepository, IMangaPage } from "./interfaces/IMangaRepository";
import { IManga, IMangaWithChapters, IUpdate, IRecommendation } from "entities";
import {
  IAddMangaDTO,
  IAddRecommendationsDTO,
  IGetGenreNamesDTO,
  IGetLatestUpdatedMangasDTO,
  IGetMangaDTO,
  IGetMangasByGenreDTO,
  IGetPopularMangasDTO,
  IGetRecommendationsDTO,
  IMangaExistsDTO,
  ISearchMangasDTO,
} from "useCases";
import {
  MangaModel,
  MangaSchema,
  RecommendationSchema,
  UpdateSchema,
} from "./schemas";
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
    const distinctGenres = await this.MangaModel.aggregate([
      { $match: { origin: data.origin } },
      { $unwind: "$genres" }, // Desconstrói o array "genres" em documentos individuais
      { $group: { _id: "$genres" } }, // Agrupa pelos valores distintos de "genres"
      { $project: { _id: 0, name: "$_id" } }, // Renomeia o campo "_id" para "genre"
    ]);

    const genreNames = distinctGenres.map((doc) => doc.name);

    return genreNames;
  }

  async getByGenre(data: IGetMangasByGenreDTO): Promise<IMangaPage> {
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
