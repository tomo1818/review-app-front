export const pagesPath = {
  "group": {
    _id: (id: string | number) => ({
      _categoryId: (categoryId: string | number) => ({
        _shopId: (shopId: string | number) => ({
          $url: (url?: { hash?: string }) => ({ pathname: '/group/[id]/[categoryId]/[shopId]' as const, query: { id, categoryId, shopId }, hash: url?.hash })
        }),
        $url: (url?: { hash?: string }) => ({ pathname: '/group/[id]/[categoryId]' as const, query: { id, categoryId }, hash: url?.hash })
      }),
      "shops": {
        $url: (url?: { hash?: string }) => ({ pathname: '/group/[id]/shops' as const, query: { id }, hash: url?.hash })
      },
      $url: (url?: { hash?: string }) => ({ pathname: '/group/[id]' as const, query: { id }, hash: url?.hash })
    }),
    $url: (url?: { hash?: string }) => ({ pathname: '/group' as const, hash: url?.hash })
  },
  "signin": {
    $url: (url?: { hash?: string }) => ({ pathname: '/signin' as const, hash: url?.hash })
  },
  "signup": {
    $url: (url?: { hash?: string }) => ({ pathname: '/signup' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath

export const staticPath = {
  favicon_ico: '/favicon.ico',
  svg: {
    icon_launch_svg: '/svg/icon_launch.svg'
  },
  vercel_svg: '/vercel.svg'
} as const

export type StaticPath = typeof staticPath
