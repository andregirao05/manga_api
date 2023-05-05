import { NextFunction, Request, Response } from "express";
import { badRequest } from "../../helpers";
import { MissingParamError } from "../../errors";

export function verifyRequiredParamsMiddleware(requiredParams: string[]) {
  return function (request: Request, response: Response, next: NextFunction) {
    const missingParams = requiredParams.filter(
      (param) => !request.query[param]
    );

    if (missingParams.length > 0) {
      return badRequest(new MissingParamError(missingParams.join(", ")));
    }

    return next();
  };
}
