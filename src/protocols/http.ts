interface HttpRequest<T> {
  body: T;
}

interface HttpResponse<T> {
  statusCode: number;
  body: T;
}

export { HttpRequest, HttpResponse };
