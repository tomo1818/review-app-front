import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'
import client from './client'
import { userState } from '@/store/user-store'
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

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useRecoilState(userState)
  const resetStatus = useResetRecoilState(userState)

  useEffect(() => {
    if (currentUser) return
    const handleGetCurrentUser = async () => {
      try {
        const res = await getCurrentUser()
        if (res?.data.isLogin === true) {
          setCurrentUser(res?.data.data)
        } else {
          resetStatus()
        }
      } catch (e) {
        console.log(e, 'error')
      }
    }
    handleGetCurrentUser()
  }, [currentUser, resetStatus, setCurrentUser])

  return currentUser
}
