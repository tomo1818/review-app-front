import { AxiosPromise } from 'axios'
import Cookies from 'js-cookie'
import client from './client'
import { HeadersItem } from '@/types/auth'
import { User } from '@/types/user'

export const getUsers = (
  word?: string,
  groupId?: number,
): AxiosPromise<User[]> => {
  if (word && groupId)
    return client.get(`/users?word=${word}&group_id=${groupId}`)
  return client.get(`/users`)
}

export const getUserGroup = (id: number) => {
  return client.get(`/users/${id}`, {
    headers: {
      'access-token': Cookies.get('_access_token') as HeadersItem,
      client: Cookies.get('_client') as HeadersItem,
      uid: Cookies.get('_uid') as HeadersItem,
    },
  })
}
