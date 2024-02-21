import {
  type HttpResponse,
  type HttpClient,
  HttpStatusCode
} from '@/data/protocols/http'
import { type AccountModel } from '../models'
import { type Authentication } from './protocols'
import { InvalidCredentialsError, UnexpectedError } from '../errors'

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async auth(params: Authentication.Input): Promise<AccountModel> {
    const res: HttpResponse<AccountModel> = await this.httpClient.post({
      url: this.url,
      data: params
    })
    console.log(res)
    if (res.statusCode === HttpStatusCode.unauthorized) {
      throw new InvalidCredentialsError()
    } else if (res.statusCode !== HttpStatusCode.ok) {
      throw new UnexpectedError()
    }

    return await Promise.resolve(res.body ?? { accessToken: '' })
  }
}
