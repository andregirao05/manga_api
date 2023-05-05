import { NextFunction, Request, Response } from "express";
import { MissingParamError } from "../../errors";

export function verifyRequiredParamsMiddleware(requiredParams: string[]) {
  return function (request: Request, response: Response, next: NextFunction) {
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
