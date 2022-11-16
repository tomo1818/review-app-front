import { useMediaQuery } from 'react-responsive'
import { breakpoints } from '@/styles/variables.styles'

type MediaQueries = {
  isDesktop: boolean
  isTablet: boolean
  isTabletAndMobile: boolean
  isMobile: boolean
}

export const useDevice = (): MediaQueries => {
  return {
    isDesktop: useMediaQuery({ minWidth: breakpoints.lg }),
    isTablet: useMediaQuery({
      maxWidth: breakpoints.lg - 1,
      minWidth: breakpoints.sm + 1,
    }),
    isTabletAndMobile: useMediaQuery({ maxWidth: breakpoints.lg - 1 }),
    isMobile: useMediaQuery({ maxWidth: breakpoints.sm }),
  }
}
