import { Collection, MongoClient, ObjectId, Db } from "mongodb";
import { IManga, IUpdate } from "../entities";
import { IDatabase } from "./interfaces";

export class Database implements IDatabase {
  private client: MongoClient | null;
  private db: Db | null;
  private mangas: Collection<IManga> | null;
  private updates: Collection<IUpdate> | null;

  constructor() {
    this.client = null;
    this.db = null;
    this.mangas = null;
    this.updates = null;
  }

  async connect(url: string): Promise<void> {
    this.client = new MongoClient(url);
    this.db = this.client.db("manga_db");
    this.mangas = this.db.collection<IManga>("mangas");
    this.updates = this.db.collection<IUpdate>("updates");
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      this.client.close();
      this.client = null;
    }
  }

  async get(id: string): Promise<IManga | null> {
    if (this.mangas) {
      const mangas = await this.mangas.findOne({ _id: new ObjectId(id) });
      return mangas;
    }

    return null;
  }

  async search(searchText: string): Promise<IManga[] | null> {
    if (this.mangas) {
      const cursor = this.mangas.find({ $text: { $search: searchText } });
      const mangas = await cursor.toArray();
      await cursor.close();
      return mangas;
    }

    return null;
  }

  async listGenres(lang: "english" | "portuguse"): Promise<string[] | null> {
    if (this.mangas) {
      const genres = this.mangas.distinct("genres", { language: lang });
      return genres;
    }

    return null;
  }

  async getMangasByGenre(genre: string): Promise<IManga[] | null> {
    if (this.mangas) {
      const cursor = this.mangas.find({ genres: genre });
      const mangas = await cursor?.toArray();
      await cursor.close();

      return mangas;
    }

    return null;
  }

  async getPopulars(siteOrigin: string): Promise<IManga[] | null> {
    if (this.updates && this.mangas) {
      const updateData = await this.updates.findOne({ origin: siteOrigin });

      const cursor = this.mangas.find({
        origin: siteOrigin,
        url: { $in: updateData?.populars },
      });
      const mangas = await cursor.toArray();
      await cursor.close();

      return mangas;
    }

    return null;
  }

  async getLatestUpdated(siteOrigin: string): Promise<IManga[] | null> {
    if (this.updates && this.mangas) {
      const updateData = await this.updates.findOne({ origin: siteOrigin });

      const cursor = this.mangas.find({
        origin: siteOrigin,
        url: { $in: updateData?.latest_updates },
      });
      const mangas = await cursor.toArray();
      await cursor.close();

      return mangas;
    }

    return null;
  }

  async exists(id: string): Promise<boolean> {
    try {
      if (this.mangas) {
        const results = await this.mangas.findOne({ _id: new ObjectId(id) });
        return results !== null;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export const db = new Database();
