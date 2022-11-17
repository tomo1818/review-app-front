import { Shop } from '@/types/shop'
import { Tag } from '@/types/tag'

export const getTags = (shops: Shop[]) => {
  let res: Tag[] = []
  shops.forEach((shop) => {
    shop.tags.forEach((tag) => {
      res.push(tag)
    })
  })
  res = res.filter((el, i, self) => self.findIndex((e) => e.id === el.id) === i)
  return res
}

export const getCategories = (shops: Shop[]) => {
  let res: number[] = []
  shops.forEach((shop) => {
    res.push(shop.categoryId)
  })
  res = res.filter((el, i) => res.indexOf(el) === i)
  return res
}
