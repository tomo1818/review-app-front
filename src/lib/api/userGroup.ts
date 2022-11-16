import { AxiosPromise } from 'axios'
import Cookies from 'js-cookie'
import client from './client'
import { HeadersItem } from '@/types/auth'
import { Group } from '@/types/group'
import { UserGroupParams } from '@/types/userGroup'

export const addUserToGroup = (
  params: UserGroupParams,
): AxiosPromise<Group> => {
  return client.post('/users_groups', params, {
    headers: {
      'access-token': Cookies.get('_access_token') as HeadersItem,
      client: Cookies.get('_client') as HeadersItem,
      uid: Cookies.get('_uid') as HeadersItem,
    },
  })
}

export const deleteUserFromGroup = (
  groupId: number,
  userId: number,
): AxiosPromise<Group> => {
  return client.delete(`/groups/${groupId}/delete_user?user_id=${userId}`, {
    headers: {
      'access-token': Cookies.get('_access_token') as HeadersItem,
      client: Cookies.get('_client') as HeadersItem,
      uid: Cookies.get('_uid') as HeadersItem,
    },
  })
}
