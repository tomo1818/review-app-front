import client from './client'
import { CategoryParams } from '@/types/category'

// グループに所得しているカテゴリー一覧を取得
export const getCategories = (groupId: number) => {
  return client.get(`/categories/${groupId}`)
}

// カテゴリーを取得
export const getCategory = (id: number) => {
  return client.get(`categories/${id}/get_category`)
}

// 新規作成
export const createCategory = (params: CategoryParams) => {
  return client.post(`/categories`, params)
}

// 更新
export const updateCategory = (categoryId: number, params: CategoryParams) => {
  return client.patch(`/categories/${categoryId}`, params)
}

// 削除
export const deleteGroup = (categoryId: number) => {
  return client.delete(`/categories/${categoryId}`)
}
