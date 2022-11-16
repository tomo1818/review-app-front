import { atom as _atom, useRecoilValue, useSetRecoilState } from 'recoil'
import { v1 } from 'uuid'

export const atom = <T>(name: string, data: T) => {
  return _atom({
    key: `${name}/${v1()}`,
    default: data,
  })
}

export { useRecoilValue, useSetRecoilState }
