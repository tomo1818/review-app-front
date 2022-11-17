import { AxiosPromise } from 'axios'
import client from './client'
import { Category } from '@/types/category'

// グループに所得しているカテゴリー一覧を取得
export const getCategories = (groupId: number): AxiosPromise<Category[]> => {
  return client.get(`/categories/${groupId}`)
}

// カテゴリーを取得
export const getCategory = (id: number): AxiosPromise<Category> => {
  return client.get(`/categories/${id}/get_category`)
}

// 新規作成
export const createCategory = (params: FormData): AxiosPromise<Category> => {
  return client.post(`/categories`, params)
}

// 更新
export const updateCategory = (
  categoryId: number,
  params: FormData,
): AxiosPromise<Category> => {
  return client.patch(`/categories/${categoryId}`, params)
}

// 削除
export const deleteCategory = (categoryId: number) => {
  return client.delete(`/categories/${categoryId}`)
}
