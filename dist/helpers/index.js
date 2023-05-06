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

// src/helpers/index.ts
var helpers_exports = {};
__export(helpers_exports, {
  badRequest: () => badRequest,
  noContent: () => noContent,
  notFound: () => notFound,
  ok: () => ok,
  serverError: () => serverError
});
module.exports = __toCommonJS(helpers_exports);

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
function notFound(error) {
  return {
    statusCode: 404,
    body: error
  };
}
function serverError(error) {
  return {
    statusCode: 500,
    body: error
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  badRequest,
  noContent,
  notFound,
  ok,
  serverError
});
