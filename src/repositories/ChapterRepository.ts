import { ObjectId } from "mongodb";
import { IMangaWithChapters, IChapter } from "entities";
import {
  IAddChaptersDTO,
  IGetChapterNamesDTO,
  IGetChaptersDTO,
  IGetSingleChapterDTO,
} from "useCases";
import { MangaModel, MangaSchema } from "./schemas";
import { model } from "mongoose";
import { IChapterRepository } from "./interfaces/IChapterRepository";

class ChapterRepository implements IChapterRepository {
  private MangaModel: MangaModel;

  constructor() {
    this.MangaModel = model<IMangaWithChapters>(
      "Manga",
      MangaSchema
    ) as MangaModel;
  }

  async get(data: IGetSingleChapterDTO): Promise<IChapter> {
    const results = await this.MangaModel.findOne({ _id: data.id }).select({
      _id: 0,
      chapters: { $elemMatch: { name: data.chapterName } },
    });

    return results?.chapters[0];
  }

  async getAll(data: IGetChaptersDTO): Promise<IChapter[]> {
    const results = await this.MangaModel.findOne({ _id: data.id }).select({
      chapters: 1,
    });

    return results?.chapters;
  }

  async getNames(data: IGetChapterNamesDTO): Promise<string[]> {
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

  async addAll(data: IAddChaptersDTO): Promise<boolean> {
    const { id, chapters } = data;

    const results = await this.MangaModel.collection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          updated_at: new Date(),
        },

        $push: {
          chapters: { $each: chapters },
        },
      }
    );

    return results.modifiedCount > 0;
  }
}

export const chapterRespository = new ChapterRepository();
