import { type HttpClient } from '@/infra/gateways/protocols'
import { RemoteAuthentication } from '@/domain/usecases'
import { mock, type MockProxy } from 'jest-mock-extended'

describe('RemoteAuthentication', () => {
  let httpClient: MockProxy<HttpClient>
  let url: string
  let sut: RemoteAuthentication

  beforeAll(() => {
    httpClient = mock()
    url = 'any_url'
  })
  beforeEach(() => {
    sut = new RemoteAuthentication(url, httpClient)
  })

  it('Should call HttpClient with correct params', async () => {
    await sut.auth({ email: 'any_email', password: 'any_password' })

    expect(httpClient.post).toHaveBeenCalledWith({
      url,
      data: { email: 'any_email', password: 'any_password' }
    })
  })
})
