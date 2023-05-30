import { Request, Response, NextFunction } from "express";
import { ValidationError, object, string } from "yup";
import * as jwt from "jsonwebtoken";
import { getEnv } from "../configs";
import { badRequest, serverError } from "../helpers";
import { InvalidAuthTokenError, ServerError } from "../errors";

const authMiddlewareSchema = object({
  authorization: string()
    .required("authorization is required in the request header")
    .matches(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/),
});

export function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { authorization } = authMiddlewareSchema.validateSync(
      request.headers
    );

    const res = jwt.verify(authorization, getEnv("TOKEN_GENERATOR_SECRET"));
    return next();
  } catch (error) {
    console.log(error);

    if (error instanceof ValidationError) {
      return badRequest(response, error);
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return badRequest(
        response,
        new InvalidAuthTokenError(request.headers.authorization)
      );
    }

    return serverError(response, new ServerError("Unexpected Error"));
  }
}
