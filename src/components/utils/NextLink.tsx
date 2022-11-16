import Link, { LinkProps } from 'next/link'

export const NextLink = ({
  children,
  ...props
}: React.PropsWithChildren<LinkProps>) => {
  return (
    <Link {...props} passHref>
      {children}
    </Link>
  )
}
