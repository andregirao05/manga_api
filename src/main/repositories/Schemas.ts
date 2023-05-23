import { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

export const ChapterSchema = new Schema(
  { name: String, pages: [String] },
  { _id: false }
);

export const MangaSchema = new Schema(
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

export const UpdateSchema = new Schema(
  {
    origin: String,
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
