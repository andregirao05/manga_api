"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/main/app.ts
var import_express3 = __toESM(require("express"));

// src/main/router.ts
var import_express2 = require("express");

// src/main/adaptRoute.ts
function adaptRoute(controller) {
  return async (request, response) => {
    const httpRequest = {
      body: request.params
    };
    const { statusCode, body } = await controller.handle(httpRequest);
    if (statusCode === 200) {
      return response.status(statusCode).json(body);
    } else {
      return response.status(statusCode).json({
        error: body.message
      });
    }
  };
}

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

// src/errors/missingParamsError.ts
var MissingParamError = class extends Error {
  constructor(paramName) {
    super(`Missing param: ${paramName}`);
    this.paramName = paramName;
    this.name = "MissingParamError";
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
var GetMangaController = class {
  constructor(database) {
    this.database = database;
  }
  async handle(request) {
    try {
      const { id } = request.body;
      if (!import_mongodb.ObjectId.isValid(id)) {
        return badRequest(new InvalidParamError("id"));
      }
      if (!await this.database.exists(id)) {
        return noContent(new MangaNotFound(id));
      }
      const manga = await this.database.get(id);
      return ok(manga);
    } catch (error) {
      return serverError(new ServerError("Error"));
    }
  }
};

// src/controllers/getPopularMangasController.ts
var GetPopularMangasController = class {
  constructor(database, origins) {
    this.database = database;
    this.origins = origins;
  }
  async handle(request) {
    try {
      const { origin } = request.body;
      if (!this.origins.includes(origin)) {
        return badRequest(new InvalidParamError("origin"));
      }
      const mangas = await this.database.getPopulars(origin);
      if (!mangas) {
        return noContent(new DataNotFoundError("Popular mangas"));
      }
      return ok({ mangas });
    } catch (error) {
      return serverError(new ServerError("Error"));
    }
  }
};

// src/controllers/getLatestUpdatedMangasController.ts
var GetLatestUpdatedMangasController = class {
  constructor(database, origins) {
    this.database = database;
    this.origins = origins;
  }
  async handle(request) {
    try {
      const { origin } = request.body;
      if (!this.origins.includes(origin)) {
        return badRequest(new InvalidParamError("origin"));
      }
      const mangas = await this.database.getLatestUpdated(origin);
      if (!mangas) {
        return noContent(new DataNotFoundError("Popular mangas"));
      }
      return ok({ mangas });
    } catch (error) {
      return serverError(new ServerError("Error"));
    }
  }
};

// src/controllers/getChaptersController.ts
var import_mongodb2 = require("mongodb");
var GetChaptersController = class {
  constructor(database) {
    this.database = database;
  }
  async handle(request) {
    try {
      const { id } = request.body;
      if (!import_mongodb2.ObjectId.isValid(id)) {
        return badRequest(new InvalidParamError("id"));
      }
      if (!await this.database.exists(id)) {
        return noContent(new MangaNotFound(id));
      }
      const chapters = await this.database.getChapters(id);
      if (!chapters) {
        return noContent(
          new DataNotFoundError(`Chapter of manga with id ${id}`)
        );
      }
      return ok({ chapters });
    } catch (error) {
      return serverError(new ServerError("Error"));
    }
  }
};

// src/controllers/getChapterNamesController.ts
var import_mongodb3 = require("mongodb");
var GetChapterNamesController = class {
  constructor(database) {
    this.database = database;
  }
  async handle(request) {
    try {
      const { id } = request.body;
      if (!import_mongodb3.ObjectId.isValid(id)) {
        return badRequest(new InvalidParamError("id"));
      }
      if (!await this.database.exists(id)) {
        return noContent(new MangaNotFound(id));
      }
      const chapterNames = await this.database.getChapterNames(id);
      if (!chapterNames) {
        return noContent(
          new DataNotFoundError(`Chapter of manga with id ${id}`)
        );
      }
      return ok({ chapterNames });
    } catch (error) {
      return serverError(new ServerError("Error"));
    }
  }
};

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

// src/controllers/searchMangasController.ts
var SearchMangasController = class {
  constructor(database) {
    this.database = database;
  }
  async handle(request) {
    try {
      const { searchTerm } = request.body;
      const mangas = await this.database.search(searchTerm);
      if (!mangas) {
        return noContent(new DataNotFoundError("Any data"));
      }
      return ok({ mangas });
    } catch (error) {
      return serverError(new ServerError("Error"));
    }
  }
};

// src/controllers/getGenreNamesController.ts
var GetGenreNamesController = class {
  constructor(database, languagesAccepted) {
    this.database = database;
    this.languagesAccepted = languagesAccepted;
  }
  async handle(request) {
    try {
      const { language } = request.body;
      if (!this.languagesAccepted.includes(language)) {
        return badRequest(new InvalidParamError("language"));
      }
      const genreNames = await this.database.listGenres(language);
      if (!genreNames) {
        return noContent(new DataNotFoundError("Genres"));
      }
      return ok({ genres: genreNames });
    } catch (error) {
      return serverError(new ServerError("Error"));
    }
  }
};

// src/controllers/getMangasByGenreController.ts
var GerMangasByGenreController = class {
  constructor(database) {
    this.database = database;
  }
  async handle(request) {
    try {
      const { genreName } = request.body;
      const mangas = await this.database.getMangasByGenre(genreName);
      if (!mangas) {
        return noContent(
          new DataNotFoundError(`Mangas of genge "${genreName}"`)
        );
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

// src/main/compositions/makeGetMangaController.ts
function makeGetMangaController() {
  return new GetMangaController(db);
}

// src/main/configs/getEnv.ts
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
function getEnv(name, alternativeValue) {
  return process.env[name] || alternativeValue;
}

// src/main/middlewares/bodyParser.ts
var import_express = require("express");
var bodyParser = (0, import_express.json)();

// src/main/middlewares/contentType.ts
function contentType(request, response, next) {
  response.type("json");
  next();
}

// src/main/middlewares/cors.ts
function cors(request, response, next) {
  response.set("access-control-allow-origin", "*");
  response.set("access-control-allow-methods", "*");
  response.set("access-control-allow-headers", "*");
  next();
}

// src/main/middlewares/verifyRequiredParamsMiddleware.ts
function verifyRequiredParamsMiddleware(requiredParams) {
  return function(request, response, next) {
    const missingParams = requiredParams.filter(
      (name) => !request.params[name]
    );
    if (missingParams.length > 0) {
      const error = new MissingParamError(missingParams.join(", "));
      return response.status(400).json({ error: error.message });
    }
    return next();
  };
}

// src/main/configs/setupMiddleware.ts
function setupMiddleware(app2) {
  app2.use(bodyParser);
  app2.use(cors);
  app2.use(contentType);
}

// src/main/configs/dataConfigs.ts
var acceptedOrigins = ["manga_livre", "readm", "test"];
var acceptedLanguages = ["english", "portuguese"];

// src/main/compositions/makeGetPopularMangasController.ts
function makeGetPopularMangasController() {
  const origins = acceptedOrigins;
  return new GetPopularMangasController(db, origins);
}

// src/main/compositions/makeGetLatestUpdatedMangasController.ts
function makeGetLatestUpdatedMangasController() {
  const origins = acceptedOrigins;
  return new GetLatestUpdatedMangasController(db, origins);
}

// src/main/compositions/makeGetChaptersController.ts
function makeGetChaptersController() {
  return new GetChaptersController(db);
}

// src/main/compositions/makeGetChapterNamesController.ts
function makeGetChapterNamesController() {
  return new GetChapterNamesController(db);
}

// src/main/compositions/makeGetSingleChapterController.ts
function makeGetSingleChapterController() {
  return new GetSingleChapterController(db);
}

// src/main/compositions/makeSearchMangasController.ts
function makeSearchMangasController() {
  return new SearchMangasController(db);
}

// src/main/compositions/makeGetGenreNamesController.ts
function makeGetGenreNamesController() {
  return new GetGenreNamesController(db, acceptedLanguages);
}

// src/main/compositions/makeGetMangasByGenreController.ts
function makeGetMangasByGenreController() {
  return new GerMangasByGenreController(db);
}

// src/main/router.ts
var router = (0, import_express2.Router)();
router.get(
  "/mangas/get/:id",
  verifyRequiredParamsMiddleware(["id"]),
  adaptRoute(makeGetMangaController())
);
router.get(
  "/info/populars/:origin",
  verifyRequiredParamsMiddleware(["origin"]),
  adaptRoute(makeGetPopularMangasController())
);
router.get(
  "/info/updates/:origin",
  verifyRequiredParamsMiddleware(["origin"]),
  adaptRoute(makeGetLatestUpdatedMangasController())
);
router.get(
  "/mangas/get/:id/list-chapters",
  verifyRequiredParamsMiddleware(["id"]),
  adaptRoute(makeGetChaptersController())
);
router.get(
  "/mangas/get/:id/chapter-names",
  verifyRequiredParamsMiddleware(["id"]),
  adaptRoute(makeGetChapterNamesController())
);
router.get(
  "/mangas/get/:id/chapters/:chapterName",
  verifyRequiredParamsMiddleware(["id", "chapterName"]),
  adaptRoute(makeGetSingleChapterController())
);
router.get(
  "/mangas/search/:searchTerm",
  verifyRequiredParamsMiddleware(["searchTerm"]),
  adaptRoute(makeSearchMangasController())
);
router.get(
  "/genres/list/:language",
  verifyRequiredParamsMiddleware(["language"]),
  adaptRoute(makeGetGenreNamesController())
);
router.get(
  "/genres/get/:genreName",
  verifyRequiredParamsMiddleware(["genreName"]),
  adaptRoute(makeGetMangasByGenreController())
);

// src/main/app.ts
var app = (0, import_express3.default)();
setupMiddleware(app);
app.use(router);

// src/main/server.ts
async function main() {
  try {
    await db.connect(getEnv("MONGO_URI", ""));
    const port = getEnv("PORT", "8000");
    app.listen(
      port,
      () => console.log(`Sever running on port http://localhost:${port}`)
    );
  } catch (error) {
    console.log(error);
  }
}
main();
