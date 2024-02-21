export interface HttpClient {
  get: <T = any>(params: HttpGetClient.Input) => Promise<T>
  post: <T = any>(params: HttpPostClient.Input) => Promise<T>
}

export namespace HttpGetClient {
  export type Input = {
    url: string
    params: Record<string, unknown>
  }
}

export namespace HttpPostClient {
  export type Input<T = unknown> = {
    url: string
    data?: T
    config?: Record<string, unknown>
  }
}

export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  notFound = 404,
  serverError = 500
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode
  body?: T
}
