import Cookies from 'js-cookie'
import client from './client'
import { HeadersItem } from '@/types/auth'
import { ReviewParams } from '@/types/review'

// レビューを取得
export const getComment = (id: number) => {
  return client.get(`/reviews/${id}/get_review`)
}

// shopのレビューを取得
export const getComments = (shopId: number) => {
  return client.get(`/reviews/${shopId}`)
}

// 新規作成
export const createReview = (params: ReviewParams) => {
  return client.post(`/reviews`, params, {
    headers: {
      'access-token': Cookies.get('_access_token') as HeadersItem,
      client: Cookies.get('_client') as HeadersItem,
      uid: Cookies.get('_uid') as HeadersItem,
    },
  })
}

// 更新
export const updateReview = (id: number, params: ReviewParams) => {
  return client.patch(`/reviews/${id}`, params, {
    headers: {
      'access-token': Cookies.get('_access_token') as HeadersItem,
      client: Cookies.get('_client') as HeadersItem,
      uid: Cookies.get('_uid') as HeadersItem,
    },
  })
}

// 削除
export const deleteReview = (id: number) => {
  return client.delete(`/reviews/${id}`, {
    headers: {
      'access-token': Cookies.get('_access_token') as HeadersItem,
      client: Cookies.get('_client') as HeadersItem,
      uid: Cookies.get('_uid') as HeadersItem,
    },
  })
}
