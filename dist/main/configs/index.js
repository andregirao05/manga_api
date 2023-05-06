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

// src/main/configs/index.ts
var configs_exports = {};
__export(configs_exports, {
  acceptedLanguages: () => acceptedLanguages,
  acceptedOrigins: () => acceptedOrigins,
  getEnv: () => getEnv,
  setupMiddleware: () => setupMiddleware
});
module.exports = __toCommonJS(configs_exports);

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

// src/main/configs/setupMiddleware.ts
function setupMiddleware(app) {
  app.use(bodyParser);
  app.use(cors);
  app.use(contentType);
}

// src/main/configs/dataConfigs.ts
var acceptedOrigins = ["manga_livre", "readm", "test"];
var acceptedLanguages = ["english", "portuguese"];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  acceptedLanguages,
  acceptedOrigins,
  getEnv,
  setupMiddleware
});
