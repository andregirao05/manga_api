"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main/compositions/makeSearchMangasController.ts
var makeSearchMangasController_exports = {};
__export(makeSearchMangasController_exports, {
  makeSearchMangasController: () => makeSearchMangasController
});
module.exports = __toCommonJS(makeSearchMangasController_exports);

// src/errors/serverError.ts
var ServerError = class extends Error {
  constructor(stack) {
    super("Internal server error");
    console.log(this.message);
    this.name = "ServerError";
    this.stack = stack;
  }
};

// src/errors/dataNotFound.ts
var DataNotFoundError = class extends Error {
  constructor(notFoundData) {
    super(`${notFoundData} not found.`);
    this.notFoundData = notFoundData;
    this.name = "DataNotFound";
  }
};

// src/errors/invalidParamError.ts
var InvalidParamError = class extends Error {
  constructor(paramName) {
    super(`Param ${paramName} is invalid.`);
    this.paramName = paramName;
    this.name = "InvalidParamError";
  }
};

// src/helpers/http.ts
function ok(data) {
  return {
    statusCode: 200,
    body: data
  };
}
function noContent(data) {
  return {
    statusCode: 204,
    body: data
  };
}
function badRequest(error) {
  return {
    statusCode: 400,
    body: error
  };
}
function serverError(error) {
  return {
    statusCode: 500,
    body: error
  };
}

// src/controllers/getMangaController.ts
var import_mongodb = require("mongodb");

// src/controllers/getChaptersController.ts
var import_mongodb2 = require("mongodb");

// src/controllers/getChapterNamesController.ts
var import_mongodb3 = require("mongodb");

// src/controllers/getSingleChapterController.ts
var import_mongodb4 = require("mongodb");

// src/controllers/searchMangasController.ts
var SearchMangasController = class {
  constructor(database, acceptedOrigins2) {
    this.database = database;
    this.acceptedOrigins = acceptedOrigins2;
  }
  async handle(request) {
    try {
      const { origin, searchTerm } = request.body;
      if (!this.acceptedOrigins.includes(origin)) {
        return badRequest(new InvalidParamError("origin"));
      }
      const mangas = await this.database.search(origin, searchTerm);
      if (!mangas) {
        return noContent(new DataNotFoundError("Any data"));
      }
      return ok({ mangas });
    } catch (error) {
      return serverError(new ServerError("Error"));
    }
  }
};

// src/database/database.ts
var import_mongodb5 = require("mongodb");
var Database = class {
  constructor() {
    this.client = null;
    this.db = null;
    this.mangas = null;
    this.updates = null;
  }
  async connect(url) {
    this.client = new import_mongodb5.MongoClient(url);
    this.db = this.client.db("manga_db");
    this.mangas = this.db.collection("mangas");
    this.updates = this.db.collection("updates");
  }
  async disconnect() {
    if (this.client) {
      this.client.close();
      this.client = null;
    }
  }
  async get(id) {
    if (this.mangas) {
      const mangas = await this.mangas.findOne(
        { _id: new import_mongodb5.ObjectId(id) },
        { projection: { chapters: 0 } }
      );
      return mangas;
    }
    return null;
  }
  async getChapters(id) {
    if (this.mangas) {
      const data = await this.mangas.findOne(
        { _id: new import_mongodb5.ObjectId(id) },
        { projection: { chapters: 1, _id: 0 } }
      );
      return data?.chapters || null;
    }
    return null;
  }
  async getChapterNames(id) {
    const chapters = await this.getChapters(id);
    if (chapters) {
      return chapters.map((chapter) => chapter.name);
    }
    return null;
  }
  async getSingleChapter(id, chapterName) {
    if (this.mangas) {
      const data = await this.mangas.findOne(
        { _id: new import_mongodb5.ObjectId(id), "chapters.name": chapterName },
        { projection: { "chapters.$": 1, _id: 0 } }
      );
      return data?.chapters[0] || null;
    }
    return null;
  }
  async search(origin, searchText) {
    if (this.mangas) {
      const cursor = this.mangas.find(
        {
          origin,
          $text: { $search: searchText }
        },
        { projection: { chapters: 0 } }
      );
      const mangas = await cursor.toArray();
      await cursor.close();
      return mangas;
    }
    return null;
  }
  async listGenres(lang) {
    if (this.mangas) {
      const genres = this.mangas.distinct("genres", { language: lang });
      return genres;
    }
    return null;
  }
  async getMangasByGenre(genre) {
    if (this.mangas) {
      const cursor = this.mangas.find(
        { genres: genre },
        { projection: { chapters: 0 } }
      );
      const mangas = await cursor?.toArray();
      await cursor.close();
      return mangas;
    }
    return null;
  }
  async getPopulars(siteOrigin) {
    if (this.updates && this.mangas) {
      const updateData = await this.updates.findOne({ origin: siteOrigin });
      const cursor = this.mangas.find(
        {
          origin: siteOrigin,
          url: { $in: updateData?.populars }
        },
        { projection: { chapters: 0 } }
      );
      const mangas = await cursor.toArray();
      await cursor.close();
      return mangas;
    }
    return null;
  }
  async getLatestUpdated(siteOrigin) {
    if (this.updates && this.mangas) {
      const updateData = await this.updates.findOne({ origin: siteOrigin });
      const cursor = this.mangas.find(
        {
          origin: siteOrigin,
          url: { $in: updateData?.latest_updates }
        },
        { projection: { chapters: 0 } }
      );
      const mangas = await cursor.toArray();
      await cursor.close();
      return mangas;
    }
    return null;
  }
  async exists(id) {
    try {
      if (this.mangas) {
        const results = await this.mangas.findOne(
          { _id: new import_mongodb5.ObjectId(id) },
          { projection: { chapters: 0 } }
        );
        return results !== null;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
};
var db = new Database();

// src/main/configs/getEnv.ts
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();

// src/main/middlewares/bodyParser.ts
var import_express = require("express");
var bodyParser = (0, import_express.json)();

// src/main/configs/dataConfigs.ts
var acceptedOrigins = ["manga_livre", "readm"];

// src/main/compositions/makeSearchMangasController.ts
function makeSearchMangasController() {
  return new SearchMangasController(db, acceptedOrigins);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  makeSearchMangasController
});
