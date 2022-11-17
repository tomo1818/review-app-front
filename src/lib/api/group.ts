import { AxiosPromise } from 'axios'
import Cookies from 'js-cookie'
import client from './client'
import { HeadersItem } from '@/types/auth'
import { Group, GroupParams } from '@/types/group'

// 一覧取得
export const getGroups = () => {
  return client.get('/groups')
}

// グループ取得
export const getGroup = (id: number): AxiosPromise<Group> => {
  return client.get(`/groups/${id}`)
}

// グループに所属しているユーザーを取得
export const getGroupUsers = (id: number) => {
  return client.get(`groups/${id}/get_group_users`)
}

// 新規作成
export const createGroup = (params: GroupParams) => {
  return client.post(`/groups`, params, {
    headers: {
      'access-token': Cookies.get('_access_token') as HeadersItem,
      client: Cookies.get('_client') as HeadersItem,
      uid: Cookies.get('_uid') as HeadersItem,
    },
  })
}

// 更新
export const updateGroup = (id: number, params: GroupParams) => {
  return client.patch(`/groups/${id}`, params, {
    headers: {
      'access-token': Cookies.get('_access_token') as HeadersItem,
      client: Cookies.get('_client') as HeadersItem,
      uid: Cookies.get('_uid') as HeadersItem,
    },
  })
}

// 削除
export const deleteGroup = (id: number) => {
  return client.delete(`/groups/${id}`, {
    headers: {
      'access-token': Cookies.get('_access_token') as HeadersItem,
      client: Cookies.get('_client') as HeadersItem,
      uid: Cookies.get('_uid') as HeadersItem,
    },
  })
}
