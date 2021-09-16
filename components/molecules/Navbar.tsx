import Link from 'next/link'
import Image from 'next/image'
import LinkButton from 'components/atoms/LinkButton'
import { User } from 'shared/types'
import { CREATOR } from 'shared/constants'
import {
  Box,
  Button,
  Container,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Divider,
} from '@chakra-ui/react'
import LinkText from 'components/atoms/Link'

const nav = [
  {
    url: '/contact',
    title: 'Contact',
  },
]

function Logo(): JSX.Element {
  return (
    <Link href="/">
      <Box as="a" href="/" position="relative" w={128} mr={8} h={10}>
        <Image layout="fill" src="/logo-dark.png" objectFit="contain" />
      </Box>
    </Link>
  )
}

function Nav(): JSX.Element {
  return (
    <Box
      as="nav"
      flexGrow={[0, 1]}
      display={['none', 'flex']}
      lineHeight={10}
      borderLeft="2px"
      borderColor="gray.200"
      fontFamily="DM Sans"
      fontWeight={700}
      color="gray.600"
    >
      {nav.map(({ title, url }) => (
        <Box key={title} ml={8} letterSpacing="0.4px">
          <Link href={url}>{title}</Link>
        </Box>
      ))}
    </Box>
  )
}

type Props = {
  user: User
}

function UserMenu(): JSX.Element {
  return (
    <PopoverContent backgroundColor="white" mr={4} w={220} px={3} py={3}>
      <PopoverArrow
        backgroundColor="white"
        borderTopWidth={1}
        borderLeftWidth={1}
      />
      <PopoverBody fontWeight="bold" letterSpacing="0.5px" color="gray.600">
        <LinkText href="/dashboard">Dashboard</LinkText>
        <LinkText href="/settings" mt={4}>
          Settings
        </LinkText>
        <Divider my={4} />
        <LinkText href="/signout">Log Out</LinkText>
      </PopoverBody>
    </PopoverContent>
  )
}

export default function Navbar({ user }: Props): JSX.Element {
  return (
    <Container py={5} as="header" borderBottom="1px" borderColor="gray.100">
      <Flex align="center" justify="space-between" wrap="wrap">
        <Flex>
          <Logo />
          <Nav />
        </Flex>
        {/* NavButtons */}
        {user ? (
          <Box>
            <LinkButton
              href={user.role === CREATOR ? '/create' : '/discover'}
              size="sm"
              mr={3}
            >
              {user.role === CREATOR ? 'Create Offer' : 'Discover'}
            </LinkButton>
            <Popover gutter={16}>
              <PopoverTrigger>
                <Button size="sm" variant="outline">
                  {user.firstName}
                </Button>
              </PopoverTrigger>
              <UserMenu />
            </Popover>
          </Box>
        ) : (
          <Box>
            <LinkButton size="sm" href="/signup" bgColor="red" mr={3}>
              Sign up
            </LinkButton>
            <LinkButton size="sm" href="/login" mr={3}>
              Login
            </LinkButton>
          </Box>
        )}
      </Flex>
    </Container>
  )
}
