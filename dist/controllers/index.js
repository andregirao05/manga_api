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

// src/controllers/index.ts
var controllers_exports = {};
__export(controllers_exports, {
  GerMangasByGenreController: () => GerMangasByGenreController,
  GetChapterNamesController: () => GetChapterNamesController,
  GetChaptersController: () => GetChaptersController,
  GetGenreNamesController: () => GetGenreNamesController,
  GetLatestUpdatedMangasController: () => GetLatestUpdatedMangasController,
  GetMangaController: () => GetMangaController,
  GetPopularMangasController: () => GetPopularMangasController,
  GetSingleChapterController: () => GetSingleChapterController,
  SearchMangasController: () => SearchMangasController
});
module.exports = __toCommonJS(controllers_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GerMangasByGenreController,
  GetChapterNamesController,
  GetChaptersController,
  GetGenreNamesController,
  GetLatestUpdatedMangasController,
  GetMangaController,
  GetPopularMangasController,
  GetSingleChapterController,
  SearchMangasController
});
