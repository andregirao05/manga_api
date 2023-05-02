import { Collection, MongoClient, ObjectId, Db } from "mongodb";
import { IManga, IUpdate } from "../entities";
import { IDatabase } from "./interfaces";

export class Database implements IDatabase {
  private client: MongoClient;
  private db: Db;
  private mangas: Collection<IManga>;
  private updates: Collection<IUpdate>;

  constructor() {
    this.client = new MongoClient(process.env.MONGO_URI || "");
    this.db = this.client.db("manga_db");
    this.mangas = this.db.collection<IManga>("mangas");
    this.updates = this.db.collection<IUpdate>("updates");
  }

  async get(id: string): Promise<IManga | null> {
    const mangas = await this.mangas.findOne({ _id: new ObjectId(id) });
    return mangas;
  }

  async search(searchText: string): Promise<IManga[]> {
    const cursor = this.mangas.find({ $text: { $search: searchText } });
    const mangas = await cursor.toArray();
    await cursor.close();

    return mangas;
  }

  async listGenres(lang: "english" | "portuguse"): Promise<string[]> {
    const genres = this.mangas.distinct("genres", { language: lang });
    return genres;
  }

  async getMangasByGenre(genre: string): Promise<IManga[]> {
    const cursor = this.mangas.find({ genres: genre });
    const mangas = await cursor.toArray();
    await cursor.close();

    return mangas;
  }

  async getPopulars(siteOrigin: string): Promise<IManga[]> {
    const updateData = await this.updates.findOne({ origin: siteOrigin });

    const cursor = this.mangas.find({
      origin: siteOrigin,
      url: { $in: updateData?.populars },
    });
    const mangas = await cursor.toArray();
    await cursor.close();

    return mangas;
  }

  async getLatestUpdated(siteOrigin: string): Promise<IManga[]> {
    const updateData = await this.updates.findOne({ origin: siteOrigin });

    const cursor = this.mangas.find({
      origin: siteOrigin,
      url: { $in: updateData?.latest_updates },
    });
    const mangas = await cursor.toArray();
    await cursor.close();

    return mangas;
  }
}
