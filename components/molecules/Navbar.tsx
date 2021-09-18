import Link from 'next/link'
import Image from 'next/image'
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import LinkButton from 'components/atoms/LinkButton'
import { User } from 'shared/types'
import { useState } from 'react'
import { CREATOR } from 'shared/constants'
import {
  Box,
  Button,
  Container,
  Flex,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Divider,
} from '@chakra-ui/react'
import LinkText from 'components/atoms/Link'

type Props = {
  user: User
}

function Logo(): JSX.Element {
  return (
    <Link href="/">
      <Box as="a" href="/" position="relative" w={128} mr={8} h={10}>
        <Image layout="fill" src="/logo-dark.png" objectFit="contain" />
      </Box>
    </Link>
  )
}

function MenuToggle({ toggle, isOpen }): JSX.Element {
  return (
    <Box display={{ base: 'block', sm: 'none' }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <HamburgerIcon />}
    </Box>
  )
}

function UserLinks() {
  return (
    <>
      <LinkText href="/dashboard">Dashboard</LinkText>
      <LinkText href="/settings" mt={4}>
        Settings
      </LinkText>
      <Divider my={4} />
      <LinkText href="/signout">Log Out</LinkText>
    </>
  )
}

function MenuLinks({ isOpen, user }): JSX.Element {
  return (
    <Box
      flexBasis={{ base: '100%', sm: 'auto' }}
      display={{ base: isOpen ? 'block' : 'none', sm: 'block' }}
    >
      <Stack
        spacing={3}
        align={['flex-start', 'center']}
        justify={['center', 'space-between', 'flex-end']}
        direction={['column', 'row']}
        pt={[6, 0]}
      >
        {user ? (
          <>
            <LinkButton
              href={user.role === CREATOR ? '/create' : '/discover'}
              size="sm"
            >
              {user.role === CREATOR ? 'Create Offer' : 'Discover'}
            </LinkButton>
            <Box display={['none', 'block']}>
              <Popover gutter={16}>
                <PopoverTrigger>
                  <Button size="sm" variant="outline">
                    {user.firstName}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  backgroundColor="white"
                  mr={4}
                  w={220}
                  px={3}
                  py={3}
                >
                  <PopoverArrow
                    backgroundColor="white"
                    borderTopWidth={1}
                    borderLeftWidth={1}
                  />
                  <PopoverBody
                    fontWeight="bold"
                    letterSpacing="0.5px"
                    color="gray.600"
                  >
                    <UserLinks />
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
            <Box
              display={['block', 'none']}
              width="full"
              flexGrow={1}
              alignItems="center"
            >
              <UserLinks />
            </Box>
          </>
        ) : (
          <>
            <LinkButton size="sm" href="/signup" bgColor="red">
              Sign up
            </LinkButton>
            <LinkButton size="sm" href="/login">
              Login
            </LinkButton>
          </>
        )}
      </Stack>
    </Box>
  )
}

export default function Navbar({ user }: Props): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Flex py={5} borderBottom="1px" borderColor="gray.100" w="full">
      <Container>
        <Flex align="center" justify="space-between" wrap="wrap">
          <Logo />
          <MenuToggle isOpen={isOpen} toggle={toggle} />
          <MenuLinks isOpen={isOpen} user={user} />
        </Flex>
      </Container>
    </Flex>
  )
}
