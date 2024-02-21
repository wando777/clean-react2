import { HttpStatusCode, type HttpClient } from '@/data/protocols/http'
import { RemoteAuthentication } from '@/domain/usecases'
import { mock, type MockProxy } from 'jest-mock-extended'
import { faker } from '@faker-js/faker'
import { type Authentication } from '@/domain/usecases/protocols'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'

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
    httpClient.post.mockResolvedValue({
      statusCode: HttpStatusCode.ok,
      body: { accessToken: faker.number.int() }
    })
    sut = new RemoteAuthentication(url, httpClient)
  })

  it('Should call HttpClient with correct params', async () => {
    await sut.auth(credentials)

    expect(httpClient.post).toHaveBeenCalledWith({
      url,
      data: credentials
    })
  })

  it('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    httpClient.post.mockResolvedValueOnce({
      statusCode: HttpStatusCode.unauthorized
    })

    const promise = sut.auth(credentials)

    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  it('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    httpClient.post.mockResolvedValueOnce({
      statusCode: HttpStatusCode.badRequest
    })

    const promise = sut.auth(credentials)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
