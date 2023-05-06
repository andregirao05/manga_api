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

// src/main/configs/setupMiddleware.ts
var setupMiddleware_exports = {};
__export(setupMiddleware_exports, {
  setupMiddleware: () => setupMiddleware
});
module.exports = __toCommonJS(setupMiddleware_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  setupMiddleware
});
