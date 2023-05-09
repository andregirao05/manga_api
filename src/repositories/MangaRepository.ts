import { Collection, MongoClient, ObjectId, Db } from "mongodb";
import { Manga, Chapter } from "../entities";
import { IMangaRepository } from "./IMangaRepository";

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

  constructor() {
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

  async get(id: string): Promise<Manga> {
    const mangas = await this.mangas.findOne(
      { _id: new ObjectId(id) },
      { projection: { chapters: 0 } }
    );

    if (mangas) return mangas;
    else return null;
  }

  async getChapters(id: string): Promise<Chapter[]> {
    const data = await this.mangas.findOne(
      { _id: new ObjectId(id) },
      { projection: { chapters: 1, _id: 0 } }
    );

    return data.chapters;
  }

  async getChapterNames(id: string): Promise<string[]> {
    const chapters = await this.getChapters(id);
    return chapters.map((chapter) => chapter.name);
  }

  async getSingleChapter(id: string, chapterName: string): Promise<Chapter> {
    const data = await this.mangas.findOne(
      { _id: new ObjectId(id), "chapters.name": chapterName },
      { projection: { "chapters.$": 1, _id: 0 } }
    );

    const [chapter] = data.chapters;

    return chapter;
  }

  async search(origin: string, searchText: string): Promise<Manga[]> {
    const cursor = this.mangas.find(
      {
        origin: origin,
        $text: { $search: searchText },
      },
      { projection: { chapters: 0 } }
    );

    const mangas = await cursor.toArray();
    await cursor.close();

    return mangas;
  }

  async listGenres(lang: string): Promise<string[]> {
    const genres = this.mangas.distinct("genres", { language: lang });
    return genres;
  }

  async getMangasByGenre(genre: string): Promise<Manga[]> {
    const cursor = this.mangas.find(
      { genres: genre },
      { projection: { chapters: 0 } }
    );
    const mangas = await cursor.toArray();
    await cursor.close();

    return mangas;
  }

  async getPopulars(siteOrigin: string): Promise<Manga[]> {
    const updateData = await this.updates.findOne({ origin: siteOrigin });

    const cursor = this.mangas.find(
      {
        origin: siteOrigin,
        url: { $in: updateData.populars },
      },
      { projection: { chapters: 0 } }
    );
    const mangas = await cursor.toArray();
    await cursor.close();

    return mangas;
  }

  async getLatestUpdated(siteOrigin: string): Promise<Manga[]> {
    const updateData = await this.updates.findOne({ origin: siteOrigin });

    const cursor = this.mangas.find(
      {
        origin: siteOrigin,
        url: { $in: updateData.latest_updates },
      },
      { projection: { chapters: 0 } }
    );
    const mangas = await cursor.toArray();
    await cursor.close();

    return mangas;
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
