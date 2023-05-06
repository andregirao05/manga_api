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

// src/controllers/getMangasByGenreController.ts
var getMangasByGenreController_exports = {};
__export(getMangasByGenreController_exports, {
  GerMangasByGenreController: () => GerMangasByGenreController
});
module.exports = __toCommonJS(getMangasByGenreController_exports);

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
function serverError(error) {
  return {
    statusCode: 500,
    body: error
  };
}

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
  GerMangasByGenreController
});
