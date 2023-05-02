import { HttpRequest, HttpResponse } from "./http";

interface Controller<Params, Response> {
  handle: (request: HttpRequest<Params>) => Promise<HttpResponse<Response>>;
}
