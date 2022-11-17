import { Box, Heading, Container, Text, Button, Stack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useDevice } from '@/hooks/use-device'

const Home: NextPage = () => {
  const { isMobile } = useDevice()
  return (
    <Container maxW={'3xl'}>
      <Stack
        as={Box}
        textAlign={'center'}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 36 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          Review App
        </Heading>
        <Text color={'gray.500'}>
          Monetize your content by charging your most loyal readers and reward
          them loyalty points. Give back to your loyal readers by granting them
          access to your pre-releases and sneak-peaks.
        </Text>
        <Stack
          direction={'column'}
          spacing={3}
          align={'center'}
          alignSelf={'center'}
          position={'relative'}
        >
          <Button
            colorScheme={'green'}
            bg={'green.400'}
            rounded={'full'}
            px={6}
            _hover={{
              bg: 'green.500',
            }}
          >
            利用を開始する
          </Button>
          <Link href="/signin">
            <Button
              variant={'link'}
              colorScheme={'blue'}
              size={isMobile ? 'sm' : 'md'}
            >
              ログインはこちら
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Container>
  )
}

export default Home
