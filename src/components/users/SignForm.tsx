import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Text,
  Flex,
  useColorModeValue,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Box,
  Link,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { User } from '@/types/user'

type Props = {
  name?: string
  setName?: (value: string) => void
  email: string
  setEmail: (value: string) => void
  password: string
  setPassword: (value: string) => void
  passwordConfirmation?: string
  setPasswordConfirmation?: (value: string) => void
  showPassword: boolean
  setShowPassword: (value: boolean) => void
  title: string
  signType: string
  handleSubmit: () => void
  currentUser: User | null | undefined
}

export const SignForm: React.FC<Props> = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  passwordConfirmation,
  setPasswordConfirmation,
  showPassword,
  setShowPassword,
  title,
  signType,
  handleSubmit,
  currentUser,
}: Props) => {
  const router = useRouter()

  useEffect(() => {
    if (currentUser) router.push('/')
  }, [currentUser, router])

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx="auto" maxW="2xl" width="2xl" py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize="4xl" textAlign="center">
            {title}
          </Heading>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={8}
        >
          <Stack spacing={4}>
            {setName && (
              <FormControl id="name" isRequired>
                <FormLabel>氏名</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
            )}
            <FormControl id="email" isRequired>
              <FormLabel>メールアドレス</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>パスワード</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            {setPasswordConfirmation && (
              <FormControl id="passwordConfirmation" isRequired>
                <FormLabel>パスワードの確認</FormLabel>
                <Input
                  type="password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
              </FormControl>
            )}
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={() => handleSubmit()}
              >
                {title}
              </Button>
            </Stack>
            {signType == 'signUp' && (
              <Stack pt={6}>
                <Text align={'center'}>
                  ログインの方は <Link color={'blue.400'}>こちら</Link>
                </Text>
              </Stack>
            )}
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
