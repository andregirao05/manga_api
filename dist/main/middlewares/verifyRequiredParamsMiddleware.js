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

// src/main/middlewares/verifyRequiredParamsMiddleware.ts
var verifyRequiredParamsMiddleware_exports = {};
__export(verifyRequiredParamsMiddleware_exports, {
  verifyRequiredParamsMiddleware: () => verifyRequiredParamsMiddleware
});
module.exports = __toCommonJS(verifyRequiredParamsMiddleware_exports);

// src/errors/missingParamsError.ts
var MissingParamError = class extends Error {
  constructor(paramName) {
    super(`Missing param: ${paramName}`);
    this.paramName = paramName;
    this.name = "MissingParamError";
  }
};

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  verifyRequiredParamsMiddleware
});
