import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  // ChevronRightIcon,
} from '@chakra-ui/icons'
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  // Popover,
  // PopoverTrigger,
  // PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import React, { useCallback, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { useDevice } from '@/hooks/use-device'
import { signOut } from '@/lib/api/auth'
import { userValueSelector } from '@/store/user-store'
import { User } from '@/types/user'

export const Header: React.FC = () => {
  const { isOpen, onToggle } = useDisclosure()
  const [user, setUser] = useRecoilState(userValueSelector)
  const { isMobile } = useDevice()
  const handleSignOut = useCallback(() => {
    setUser(null)
    signOut()
  }, [setUser])
  const mobileNav = {
    handleSignOut: handleSignOut,
    isMobile: isMobile,
    user: user,
  }

  useEffect(() => {
    setUser(user)
  }, [setUser, user])

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          alignItems="center"
          justify={{ base: 'center', md: 'start' }}
        >
          <NextLink href="/">
            <Box
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              fontFamily={'heading'}
              color={useColorModeValue('gray.800', 'white')}
              cursor="pointer"
            >
              Logo
            </Box>
          </NextLink>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav isMobile={isMobile} />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          {user ? (
            <Button
              display={{ base: 'none', md: 'inline-flex' }}
              size={isMobile ? 'sm' : 'md'}
              fontWeight={600}
              colorScheme="teal"
              onClick={() => handleSignOut()}
            >
              ログアウト
            </Button>
          ) : (
            <>
              <NextLink href="/signin">
                <Button
                  display={{ base: 'none', md: 'inline-flex' }}
                  size={isMobile ? 'sm' : 'md'}
                  fontWeight={400}
                  variant={'link'}
                >
                  ログイン
                </Button>
              </NextLink>

              <NextLink href="/signup" passHref>
                <a style={{ color: 'white' }}>
                  <Button
                    display={{ base: 'none', md: 'inline-flex' }}
                    size={isMobile ? 'sm' : 'md'}
                    fontWeight={600}
                    colorScheme="teal"
                  >
                    登録する
                  </Button>
                </a>
              </NextLink>
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav {...mobileNav} />
      </Collapse>
    </Box>
  )
}

const DesktopNav: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const linkColor = useColorModeValue('gray.600', 'gray.200')
  const linkHoverColor = useColorModeValue('gray.800', 'white')
  // const popoverContentBgColor = useColorModeValue('white', 'gray.800')

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          {/* <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <NextLink href={navItem.href}>
                <Box
                  p={2}
                  fontSize={isMobile ? "xs" : "sm"}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                  }}
                  cursor='pointer'
                >
                  {navItem.label}
                </Box>
              </NextLink>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover> */}
          <NextLink href={navItem.href}>
            <Box
              p={2}
              fontSize={isMobile ? 'xs' : 'sm'}
              fontWeight={500}
              color={linkColor}
              _hover={{
                textDecoration: 'none',
                color: linkHoverColor,
              }}
              cursor="pointer"
            >
              {navItem.label}
            </Box>
          </NextLink>
        </Box>
      ))}
    </Stack>
  )
}

// const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
//   return (
//     <Link
//       href={href}
//       role={'group'}
//       display={'block'}
//       p={2}
//       rounded={'md'}
//       _hover={{ bg: useColorModeValue('teal.100', 'gray.900') }}
//     >
//       <Stack direction={'row'} align={'center'}>
//         <Box>
//           <Text transition={'all .3s ease'} fontWeight={500}>
//             {label}
//           </Text>
//           <Text fontSize={isMobile ? "xs" : "sm"}>{subLabel}</Text>
//         </Box>
//         <Flex
//           transition={'all .3s ease'}
//           transform={'translateX(-10px)'}
//           opacity={0}
//           _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
//           justify={'flex-end'}
//           align={'center'}
//           flex={1}
//         >
//           <Icon color={'teal.400'} w={5} h={5} as={ChevronRightIcon} />
//         </Flex>
//       </Stack>
//     </Link>
//   )
// }

const MobileNav = ({ handleSignOut, isMobile, user }: MobileNav) => {
  const getMobileItem = (navItem: NavItem): MobileItem => {
    return {
      label: navItem.label,
      children: navItem.children,
      href: navItem.href,
      handleSignOut,
      isMobile,
      user,
    }
  }
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...getMobileItem(navItem)} />
      ))}
      {user ? (
        <>
          <Stack spacing={4}>
            <Box
              py={2}
              _hover={{
                textDecoration: 'none',
              }}
            >
              <Link onClick={handleSignOut}>ログアウト</Link>
            </Box>
          </Stack>
        </>
      ) : (
        <>
          <Stack spacing={4}>
            <Box
              py={2}
              _hover={{
                textDecoration: 'none',
              }}
            >
              <NextLink href="/signin">ログイン</NextLink>
            </Box>
          </Stack>
          <Stack spacing={4}>
            <Box
              py={2}
              _hover={{
                textDecoration: 'none',
              }}
            >
              <NextLink href="/signup">登録する</NextLink>
            </Box>
          </Stack>
        </>
      )}
    </Stack>
  )
}

const MobileNavItem = ({
  label,
  children,
  href,
  isMobile,
  handleSignOut,
  user,
}: MobileItem) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <NextLink href={href}>
        <Flex
          py={2}
          justify={'space-between'}
          align={'center'}
          _hover={{
            textDecoration: 'none',
          }}
        >
          <Text
            fontWeight={600}
            color={useColorModeValue('gray.600', 'gray.200')}
          >
            {label}
          </Text>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition={'all .25s ease-in-out'}
              transform={isOpen ? 'rotate(180deg)' : ''}
              w={6}
              h={6}
            />
          )}
        </Flex>
      </NextLink>

      <Collapse
        in={isOpen}
        animateOpacity
        style={{ marginTop: '0 !important' }}
      >
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}

interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href: string
}

interface MobileNav {
  handleSignOut: () => void
  isMobile: boolean
  user: User | undefined | null
}

interface MobileItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href: string
  handleSignOut: () => void
  isMobile: boolean
  user: User | undefined | null
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'グループ一覧',
    href: '/group',
  },
  // {
  //   label: 'Inspiration',
  //   children: [
  //     {
  //       label: 'Explore Design Work',
  //       subLabel: 'Trending Design to inspire you',
  //       href: '#',
  //     },
  //     {
  //       label: 'New & Noteworthy',
  //       subLabel: 'Up-and-coming Designers',
  //       href: '#',
  //     },
  //   ],
  // },
  // {
  //   label: 'Find Work',
  //   children: [
  //     {
  //       label: 'Job Board',
  //       subLabel: 'Find your dream design job',
  //       href: '#',
  //     },
  //     {
  //       label: 'Freelance Projects',
  //       subLabel: 'An exclusive list for contract work',
  //       href: '#',
  //     },
  //   ],
  // },
  // {
  //   label: 'Hire Designers',
  //   href: '#',
  // },
]
