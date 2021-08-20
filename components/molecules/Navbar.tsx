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
  PopoverHeader,
  PopoverBody,
  Divider,
} from '@chakra-ui/react'

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
      borderColor="neutrals6"
      fontFamily="DM Sans"
      fontWeight={700}
      color="neutrals4"
    >
      {nav.map(({ title, url }) => (
        <Box key={title} ml={8} letterSpacing="0.4px">
          <Link href={url}>{title}</Link>
        </Box>
      ))}
    </Box>
  )
}

function UserMenu({ user }: { user: User }): JSX.Element {
  return (
    <PopoverContent backgroundColor="white">
      <PopoverArrow
        backgroundColor="white"
        borderTopWidth={1}
        borderLeftWidth={1}
      />
      <PopoverHeader borderBottomWidth="0px">{user.firstName}</PopoverHeader>
      <PopoverBody fontWeight="bold" letterSpacing="0.5px" color="neutrals4">
        <Box>My Dashboard</Box>
        <Divider />
        <Box>Dark Mode</Box>
        <Divider />
        <Box>Log Out</Box>
      </PopoverBody>
    </PopoverContent>
  )
}

type NavbarProps = {
  user: User
}

export default function Navbar({ user }: NavbarProps): JSX.Element {
  return (
    <Container py={5} as="header" borderBottom="1px" borderColor="neutrals6">
      <Flex align="center" justify="space-between" wrap="wrap">
        <Flex>
          <Logo />
          <Nav />
        </Flex>
        {/* NavButtons */}
        {user ? (
          <Box>
            <LinkButton
              href={user.type === CREATOR ? '/create' : '/discover'}
              size="sm"
              mr={3}
            >
              {user.type === CREATOR ? 'Create Offer' : 'Discover'}
            </LinkButton>
            <Popover>
              <PopoverTrigger>
                <Button size="sm" variant="outline">
                  {user.firstName}
                </Button>
              </PopoverTrigger>
              <UserMenu user={user} />
            </Popover>
          </Box>
        ) : (
          <Box>
            <LinkButton size="sm" href="/register" bgColor="red" mr={3}>
              Register
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
