import Cookies from 'js-cookie'
import client from './client'
import { HeadersItem, SignInParams, SignUpParams } from '@/types/auth'

export const signUp = (params: SignUpParams) => {
  return client.post('/auth', params)
}

export const signIn = (params: SignInParams) => {
  return client.post('/auth/sign_in', params)
}

export const signOut = () => {
  return client.delete('/auth/sign_out', {
    headers: {
      'access-token': Cookies.get('_access_token') as HeadersItem,
      client: Cookies.get('_client') as HeadersItem,
      uid: Cookies.get('_uid') as HeadersItem,
    },
  })
}

export const getCurrentUser = () => {
  if (
    !Cookies.get('_access_token') ||
    !Cookies.get('_client') ||
    !Cookies.get('_uid')
  )
    return
  return client.get('/auth/sessions', {
    headers: {
      'access-token': Cookies.get('_access_token') as HeadersItem,
      client: Cookies.get('_client') as HeadersItem,
      uid: Cookies.get('_uid') as HeadersItem,
    },
  })
}
