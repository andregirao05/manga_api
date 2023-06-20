import { Schema, PaginateModel } from "mongoose";
import paginate from "mongoose-paginate-v2";
import {
  IChapter,
  IMangaWithChapters,
  IRecommendation,
  IUpdate,
} from "entities";
import { ObjectId } from "mongodb";

export const ChapterSchema = new Schema<IChapter>(
  { name: String, pages: [String] },
  { _id: false }
);

export const MangaSchema = new Schema<IMangaWithChapters>(
  {
    title: String,
    alternative_title: String,
    author: String,
    artist: String,
    status: String,
    rating: Number,
    url: String,
    origin: String,
    language: String,
    thumbnail: String,
    genres: [String],
    summary: String,
    chapters: [ChapterSchema],
  },
  {
    collection: "mangas",

    toObject: {
      transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
      },
    },

    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
      },
    },
  }
);

MangaSchema.plugin(paginate);

export const UpdateSchema = new Schema<IUpdate>(
  {
    origin: String,
    language: String,
    populars: [String],
    latest_updates: [String],
  },
  {
    collection: "updates",

    toObject: {
      transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
      },
    },

    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
      },
    },
  }
);

export const RecommendationSchema = new Schema<IRecommendation>(
  {
    origin: String,
    ids: [ObjectId],
  },
  {
    collection: "recommendations",

    toObject: {
      transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
      },
    },

    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
      },
    },
  }
);

export interface MangaModel extends PaginateModel<IMangaWithChapters> {}
