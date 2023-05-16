import { Collection, MongoClient, ObjectId, Db } from "mongodb";
import { Manga, Chapter } from "../entities";
import { IMangaRepository } from "./IMangaRepository";
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
} from "../models";

interface MangaColType extends Manga {
  chapters: Chapter[];
}

interface UpdateColType {
  origin: string;
  populars: string[];
  latest_updates: string[];
}

export class MangaRepositoty implements IMangaRepository {
  private client: MongoClient | null;
  private db: Db | null;
  private mangas: Collection<MangaColType> | null;
  private updates: Collection<UpdateColType> | null;

  constructor(private readonly mangasPerPage: number = 20) {
    this.client = null;
    this.db = null;
    this.mangas = null;
    this.updates = null;
  }

  async connect(url: string): Promise<void> {
    this.client = new MongoClient(url);
    this.db = this.client.db("manga_db");
    this.mangas = this.db.collection<MangaColType>("mangas");
    this.updates = this.db.collection<UpdateColType>("updates");
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      this.client.close();
      this.client = null;
    }
  }

  async get(data: IGetMangaDTO): Promise<IResultsDTO> {
    const mangas = await this.mangas.findOne(
      { _id: new ObjectId(data.id) },
      { projection: { chapters: 0 } }
    );

    return { data: mangas };
  }

  async getChapters(data: IGetChaptersDTO): Promise<IResultsDTO> {
    const results = await this.mangas.findOne(
      { _id: new ObjectId(data.id) },
      { projection: { chapters: 1, _id: 0 } }
    );

    return { data: results.chapters };
  }

  async getChapterNames(data: IGetChapterNamesDTO): Promise<IResultsDTO> {
    const results = await this.mangas.findOne(
      { _id: new ObjectId(data.id) },
      { projection: { chapters: 1, _id: 0 } }
    );
    const names = results.chapters.map((chapter) => chapter.name);

    return { data: names };
  }

  async getSingleChapter(data: IGetSingleChapterDTO): Promise<IResultsDTO> {
    const results = await this.mangas.findOne(
      { _id: new ObjectId(data.id), "chapters.name": data.chapterName },
      { projection: { "chapters.$": 1, _id: 0 } }
    );

    const [chapter] = results.chapters;

    return { data: chapter };
  }

  async search(data: ISearchMangasDTO): Promise<IResultsWithPageInfoDTO> {
    const cursor = this.mangas
      .find(
        {
          origin: data.origin,
          $text: { $search: `\"${data.searchTerm}\"` },
        },
        { projection: { chapters: 0 } }
      )
      .sort({ score: { $meta: "textScore" } })
      .skip(this.mangasPerPage * (data.page - 1))
      .limit(this.mangasPerPage);

    const results = await cursor.toArray();
    await cursor.close();

    return { data: results };
  }

  async listGenres(data: IGetGenreNamesDTO): Promise<IResultsDTO> {
    const genres = await this.mangas.distinct("genres", {
      language: data.language,
    });

    return { data: genres };
  }

  async getMangasByGenre(
    data: IGetMangasByGenreDTO
  ): Promise<IResultsWithPageInfoDTO> {
    const cursor = await this.mangas
      .find({ genres: data.genreName }, { projection: { chapters: 0 } })
      .skip(this.mangasPerPage * (data.page - 1))
      .limit(this.mangasPerPage);

    const results = await cursor.toArray();
    await cursor.close();

    return { data: results };
  }

  async getPopulars(
    data: IGetPopularMangasDTO
  ): Promise<IResultsWithPageInfoDTO> {
    const updateData = await this.updates.findOne({ origin: data.origin });

    const cursor = this.mangas
      .find(
        {
          origin: data.origin,
          url: { $in: updateData.populars },
        },
        { projection: { chapters: 0 } }
      )
      .skip(this.mangasPerPage * (data.page - 1))
      .limit(this.mangasPerPage);

    const results = await cursor.toArray();
    await cursor.close();

    return { data: results };
  }

  async getLatestUpdated(
    data: IGetLatestUpdatedMangasDTO
  ): Promise<IResultsWithPageInfoDTO> {
    const updateData = await this.updates.findOne({ origin: data.origin });

    const cursor = this.mangas
      .find(
        {
          origin: data.origin,
          url: { $in: updateData.latest_updates },
        },
        { projection: { chapters: 0 } }
      )
      .skip(this.mangasPerPage * (data.page - 1))
      .limit(this.mangasPerPage);

    const results = await cursor.toArray();
    await cursor.close();

    return { data: results };
  }

  async exists(id: string): Promise<boolean> {
    try {
      const results = await this.mangas.findOne(
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
