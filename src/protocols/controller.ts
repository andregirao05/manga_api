import { HttpRequest, HttpResponse } from "./http";

export interface Controller<Params, Response> {
  handle: (request: HttpRequest<Params>) => Promise<HttpResponse<Response>>;
}
