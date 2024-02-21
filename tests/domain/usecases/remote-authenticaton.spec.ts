import { type HttpClient } from '@/infra/gateways/protocols'
import { RemoteAuthentication } from '@/domain/usecases'
import { mock, type MockProxy } from 'jest-mock-extended'
import { faker } from '@faker-js/faker'
import { type Authentication } from '@/domain/usecases/protocols'

describe('RemoteAuthentication', () => {
  let httpClient: MockProxy<HttpClient>
  let url: string
  let sut: RemoteAuthentication
  let credentials: Authentication.Input

  beforeAll(() => {
    httpClient = mock()
    url = faker.internet.url()
    credentials = {
      email: faker.internet.email(),
      password: faker.internet.password()
    }
  })
  beforeEach(() => {
    sut = new RemoteAuthentication(url, httpClient)
  })

  it('Should call HttpClient with correct params', async () => {
    await sut.auth(credentials)

    expect(httpClient.post).toHaveBeenCalledWith({
      url,
      data: credentials
    })
  })
})
