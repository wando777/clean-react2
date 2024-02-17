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
