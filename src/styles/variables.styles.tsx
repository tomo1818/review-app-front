import { BreakpointKeys } from '@/types/types'

export const breakpoints: Record<BreakpointKeys, number> = {
  sm: 599,
  md: 789,
  lg: 1024,
  xl: 1200,
} as const
