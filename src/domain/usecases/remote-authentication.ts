import { type HttpClient } from '@/infra/gateways/protocols'
import { type AccountModel } from '../models'
import { type Authentication } from './protocols'

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async auth(params: Authentication.Input): Promise<AccountModel> {
    await this.httpClient.post({ url: this.url, data: params })
    return await Promise.resolve({ accessToken: 'any_token' })
  }
}
