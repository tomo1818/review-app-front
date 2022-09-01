import client from './client'
import { groupParams } from '@/types/group'

// 一覧取得
export const getGroups = () => {
  return client.get('/groups')
}

// グループ取得
export const getGroup = (id: number) => {
  return client.get(`/groups/${id}`)
}

// 新規作成
export const createGroup = (params: groupParams) => {
  return client.post(`/groups`, params)
}

// 更新
export const updateGroup = (id: number, params: groupParams) => {
  return client.patch(`/groups/${id}`, params)
}

// 削除
export const deleteGroup = (id: number) => {
  return client.delete(`/groups/${id}`)
}
