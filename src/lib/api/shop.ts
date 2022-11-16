import { AxiosPromise } from 'axios'
import Cookies from 'js-cookie'
import client from './client'
import { HeadersItem } from '@/types/auth'
import { Shop, ShopParams, ShopResponse } from '@/types/shop'

// shopを取得
export const getShop = (id: number): AxiosPromise<ShopResponse> => {
  return client.get(`shops/${id}/get_shop`)
}

// カテゴリーに所属しているショップ一覧を取得
export const getShops = (categoryId: number) => {
  return client.get(`/shops/${categoryId}`)
}

// グループに所属しているショップ一覧を取得
export const getAllShops = (groupId: number): AxiosPromise<Shop[]> => {
  return client.get(`shops/${groupId}/get_all_shops`)
}

// 新規作成
export const createShop = (params: ShopParams) => {
  return client.post(`/shops`, params, {
    headers: {
      'access-token': Cookies.get('_access_token') as HeadersItem,
      client: Cookies.get('_client') as HeadersItem,
      uid: Cookies.get('_uid') as HeadersItem,
    },
  })
}

// 更新
export const updateShop = (id: number, params: ShopParams) => {
  return client.patch(`/shops/${id}`, params, {
    headers: {
      'access-token': Cookies.get('_access_token') as HeadersItem,
      client: Cookies.get('_client') as HeadersItem,
      uid: Cookies.get('_uid') as HeadersItem,
    },
  })
}

// 削除
export const deleteShop = (id: number) => {
  return client.delete(`/shops/${id}`, {
    headers: {
      'access-token': Cookies.get('_access_token') as HeadersItem,
      client: Cookies.get('_client') as HeadersItem,
      uid: Cookies.get('_uid') as HeadersItem,
    },
  })
}
