import { AxiosPromise } from 'axios'
import { request } from '../../../src'

const ENDPOINT = 'https://5eb2deca974fee0016ecd021.mockapi.io'

interface IUsersRequest {
  page?: number
  limit?: number
}

interface IUsersResponse {
  id: string
  createdAt: string
  name: string
  avatar: string
}

export namespace IGetUsers {
  export type Request = IUsersRequest
  export type Response = IUsersResponse[]
  export type User = IUsersResponse
}

const getAll = ({
  page = 1,
  limit = 10,
}: IUsersRequest): AxiosPromise<IGetUsers.Response> => {
  return request('/users', {
    params: {
      page,
      limit,
    },
  })
}

interface IUserRequest {
  id: string
}

interface IUserResponse {
  id: string
  createdAt: string
  name: string
  avatar: string
}

export namespace IGetUser {
  export type Request = IUserRequest
  export type Response = IUserResponse
}

export const get = ({
  id,
}: IGetUser.Request): AxiosPromise<IGetUser.Response> => {
  return request(`${ENDPOINT}/users/${id}`)
}

interface ICreateUserRequest {
  name: string
  avatar: string
}

interface ICreateUserResponse {
  id: string
  createdAt: string
  name: string
  avatar: string
}

export namespace ICreateUser {
  export type Request = ICreateUserRequest
  export type Response = ICreateUserResponse
}

export const create = (
  data: ICreateUser.Request
): AxiosPromise<ICreateUser.Response> => {
  return request('/users', {
    method: 'POST',
    data,
  })
}

export default {
  getAll,
  get,
  create,
}
