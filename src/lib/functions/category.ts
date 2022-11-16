import { CategoryParams } from '@/types/category'

export const createCategoryFormData = (params: CategoryParams): FormData => {
  const formData = new FormData()
  formData.append('category[name]', params.name)
  formData.append('category[groupId]', String(params.groupId))
  if (params.thumbnail)
    formData.append('category[thumbnail]', params.thumbnail as never)

  return formData
}
