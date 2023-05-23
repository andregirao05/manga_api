import { Response } from "express";

export function ok(response: Response, data: any) {
  return response.status(200).json(data);
}

export function noContent(response: Response) {
  return response.status(204).send("No content.");
}

export function badRequest(response: Response, error: Error) {
  return response.status(400).json({
    error: error.message,
  });
}

export function notFound(response: Response, error: Error) {
  return response.status(404).json({
    error: error.message,
  });
}

export function serverError(response: Response, error: Error) {
  return response.status(500).json({
    error: error.message,
  });
}
