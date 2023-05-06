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

// src/controllers/getChapterNamesController.ts
var getChapterNamesController_exports = {};
__export(getChapterNamesController_exports, {
  GetChapterNamesController: () => GetChapterNamesController
});
module.exports = __toCommonJS(getChapterNamesController_exports);
var import_mongodb = require("mongodb");

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

// src/controllers/getChapterNamesController.ts
var GetChapterNamesController = class {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetChapterNamesController
});
