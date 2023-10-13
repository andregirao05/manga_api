import { ObjectId } from "mongodb";
import { IMangaRepository, IMangaPage } from "./interfaces/IMangaRepository";
import {
  IManga,
  IMangaWithChapters,
  IUpdate,
  IRecommendation,
  IGenre,
} from "entities";
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
  GenreSchema,
} from "./schemas";
import { model, Model } from "mongoose";

class MangaRepository implements IMangaRepository {
  private MangaModel: MangaModel;
  private UpdateModel: Model<IUpdate>;
  private RecommendationModel: Model<IRecommendation>;
  private GenreModel: Model<IGenre>;

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

    this.GenreModel = model<IGenre>("Genre", GenreSchema);
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
    };

    const results = await this.MangaModel.paginate(
      {
        origin: data.origin,
        title: { $regex: data.searchTerm, $options: "i" },
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
    const results = await this.GenreModel.distinct("name", {
      origin: data.origin,
    });
    return results;
  }

  async upsertGenre(name: string, origin: string): Promise<boolean> {
    const genreExists = await this.GenreModel.findOne({
      name: name,
      origin: origin,
    });

    if (!genreExists) {
      const results = await this.GenreModel.collection.insertOne({
        name: name,
        origin: origin,
        is_adult: false,
        image_url: "",
      });

      return results != null;
    }

    return false;
  }

  async getAdultGenreNames(origin: string): Promise<string[]> {
    const results = await this.GenreModel.distinct("name", {
      origin: origin,
      is_adult: true,
    });
    return results;
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
    const options = {
      page: data.page,
      limit: this.mangasPerPage,
      projection: { chapters: 0 },
      sort: { updated_at: -1 },
    };

    const results = await this.MangaModel.paginate(
      {
        origin: data.origin,
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
      created_at: new Date(),
      updated_at: new Date(),
    });

    for (let genreName of genres) {
      this.upsertGenre(genreName, origin);
    }

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
