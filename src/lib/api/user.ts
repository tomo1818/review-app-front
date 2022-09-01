import Cookies from 'js-cookie'
import client from './client'
import { HeadersItem } from '@/types/auth'

export const getUserGroup = (id: number) => {
  return client.get(`/users/${id}`, {
    headers: {
      'access-token': Cookies.get('_access_token') as HeadersItem,
      client: Cookies.get('_client') as HeadersItem,
      uid: Cookies.get('_uid') as HeadersItem,
    },
  })
}
