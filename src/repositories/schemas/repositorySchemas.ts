import { Schema, PaginateModel } from "mongoose";
import paginate from "mongoose-paginate-v2";
import {
  IChapter,
  IGenre,
  IMangaWithChapters,
  IRecommendation,
  IUpdate,
  IUser,
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
    created_at: Date,
    updated_at: Date,
  },
  {
    collection: "mangas",

    toObject: {
      transform: function (doc, ret) {
        ret.id = ret._id.toString();

        delete ret.created_at;
        delete ret.updated_at;
        delete ret._id;
      },
    },

    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id.toString();

        delete ret.created_at;
        delete ret.updated_at;
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

export const UserSchema = new Schema<IUser>(
  { username: String, password: String },
  {
    collection: "users",

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

export const GenreSchema = new Schema<IGenre>(
  {
    name: String,
    origin: String,
    is_adult: Boolean,
    image_url: String,
  },

  {
    collection: "genres",

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
