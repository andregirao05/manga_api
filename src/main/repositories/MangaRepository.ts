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
  IResultsDTO,
  IResultsWithPageInfoDTO,
  ISearchMangasDTO,
} from "../../domain/DTOs";
import mongoose from "mongoose";
import { MangaSchema, UpdateSchema } from "./Schemas";

export class MangaRepositoty implements IMangaRepository {
  private Manga: any;
  private Update: any;

  constructor(private readonly mangasPerPage: number = 20) {
    this.Manga = mongoose.model("Manga", MangaSchema);
    this.Update = mongoose.model("Update", UpdateSchema);
  }

  async connect(url: string): Promise<void> {
    await mongoose.connect(url);
  }

  async disconnect(): Promise<void> {
    await mongoose.disconnect();
  }

  async get(data: IGetMangaDTO): Promise<IResultsDTO> {
    const manga = await this.Manga.findOne({ _id: data.id }).select({
      chapters: 0,
    });

    return { data: manga };
  }

  async getChapters(data: IGetChaptersDTO): Promise<IResultsDTO> {
    const results = await this.Manga.findOne({ _id: data.id }).select({
      chapters: 1,
    });

    return { data: results.chapters };
  }

  async getChapterNames(data: IGetChapterNamesDTO): Promise<IResultsDTO> {
    const results = await this.Manga.aggregate([
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

    return { data: names };
  }

  async getSingleChapter(data: IGetSingleChapterDTO): Promise<IResultsDTO> {
    const results = await this.Manga.findOne({ _id: data.id }).select({
      _id: 0,
      chapters: { $elemMatch: { name: data.chapterName } },
    });

    const [chapter] = results.chapters;

    return { data: chapter };
  }

  async search(data: ISearchMangasDTO): Promise<IResultsWithPageInfoDTO> {
    const options = {
      page: data.page,
      limit: this.mangasPerPage,
      projection: { chapters: 0 },
    };

    const results = await this.Manga.paginate(
      {
        origin: data.origin,
        $text: { $search: `\"${data.searchTerm}\"` },
      },
      options
    );

    return {
      data: results.docs,
      currentPage: results.page,
      totalPages: results.totalPages,
    };
  }

  async listGenres(data: IGetGenreNamesDTO): Promise<IResultsDTO> {
    const genres = await this.Manga.distinct("genres", {
      language: data.language,
    });

    return { data: genres };
  }

  async getMangasByGenre(
    data: IGetMangasByGenreDTO
  ): Promise<IResultsWithPageInfoDTO> {
    const options = {
      page: data.page,
      limit: this.mangasPerPage,
      projection: { chapters: 0 },
    };

    const results = await this.Manga.paginate(
      { genres: data.genreName },
      options
    );

    return {
      data: results.docs,
      currentPage: results.page,
      totalPages: results.totalPages,
    };
  }

  async getPopulars(
    data: IGetPopularMangasDTO
  ): Promise<IResultsWithPageInfoDTO> {
    const updateData = await this.Update.findOne({ origin: data.origin });

    const options = {
      page: data.page,
      limit: this.mangasPerPage,
      projection: { chapters: 0 },
    };

    const results = await this.Manga.paginate(
      {
        origin: data.origin,
        url: { $in: updateData.populars },
      },
      options
    );

    return {
      data: results.docs,
      currentPage: results.page,
      totalPages: results.totalPages,
    };
  }

  async getLatestUpdated(
    data: IGetLatestUpdatedMangasDTO
  ): Promise<IResultsWithPageInfoDTO> {
    const updateData = await this.Update.findOne({ origin: data.origin });

    const options = {
      page: data.page,
      limit: this.mangasPerPage,
      projection: { chapters: 0 },
    };

    const results = await this.Manga.paginate(
      {
        origin: data.origin,
        url: { $in: updateData.latest_updates },
      },
      options
    );

    return {
      data: results.docs,
      currentPage: results.page,
      totalPages: results.totalPages,
    };
  }

  async exists(id: string): Promise<boolean> {
    try {
      const results = await this.Manga.findOne(
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
