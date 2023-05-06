"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main/compositions/makeGetSingleChapterController.ts
var makeGetSingleChapterController_exports = {};
__export(makeGetSingleChapterController_exports, {
  makeGetSingleChapterController: () => makeGetSingleChapterController
});
module.exports = __toCommonJS(makeGetSingleChapterController_exports);

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

// src/errors/mangaNotFound.ts
var MangaNotFound = class extends DataNotFoundError {
  constructor(id) {
    super(`Manga with id "${id}"`);
    this.id = id;
    this.name = "MangaNotFound";
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
var GetSingleChapterController = class {
  constructor(database) {
    this.database = database;
  }
  async handle(request) {
    try {
      const { id, chapterName } = request.body;
      if (!import_mongodb4.ObjectId.isValid(id)) {
        return badRequest(new InvalidParamError("id"));
      }
      if (!await this.database.exists(id)) {
        return noContent(new MangaNotFound(id));
      }
      const chapter = await this.database.getSingleChapter(id, chapterName);
      if (!chapter) {
        return noContent(
          new DataNotFoundError(`Chapter ${chapter} in manga with id ${id}`)
        );
      }
      return ok(chapter);
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
  async search(searchText) {
    if (this.mangas) {
      const cursor = this.mangas.find(
        { $text: { $search: searchText } },
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

// src/main/compositions/makeGetSingleChapterController.ts
function makeGetSingleChapterController() {
  return new GetSingleChapterController(db);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  makeGetSingleChapterController
});
