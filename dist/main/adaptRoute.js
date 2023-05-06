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

// src/main/adaptRoute.ts
var adaptRoute_exports = {};
__export(adaptRoute_exports, {
  adaptRoute: () => adaptRoute
});
module.exports = __toCommonJS(adaptRoute_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  adaptRoute
});
