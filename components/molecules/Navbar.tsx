import Link from 'next/link'
import Image from 'next/image'
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import LinkButton from 'components/atoms/LinkButton'
import { User } from 'shared/types'
import { useState, JSXElementConstructor } from 'react'
import { CREATOR } from 'shared/constants'
import {
  Box,
  Button,
  IconButton,
  Container,
  Flex,
  Stack,
  Popover,
  PopoverTrigger,
  useColorMode,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Divider,
} from '@chakra-ui/react'
import LinkText from 'components/atoms/Link'

type Props = {
  user: User
}

function Logo({ isLightMode }: { isLightMode: boolean }): JSX.Element {
  return (
    <Link href="/">
      <Box as="a" href="/" position="relative" w={128} mr={8} h={10}>
        <Image
          layout="fill"
          src={isLightMode ? '/logo-dark.png' : '/logo-light.png'}
          objectFit="contain"
        />
      </Box>
    </Link>
  )
}

function MenuToggle({
  toggle,
  isOpen,
}: {
  toggle: () => void
  isOpen: boolean
}): JSX.Element {
  return (
    <Box display={{ base: 'block', sm: 'none' }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <HamburgerIcon />}
    </Box>
  )
}

function UserLinks({ user }: Props): JSX.Element {
  const isCreator = user.role === CREATOR
  return (
    <>
      {isCreator && (
        <LinkText href={`/profile/${user.slug}`}>My Profile</LinkText>
      )}
      <LinkText href="/dashboard" mt={4}>
        Dashboard
      </LinkText>
      <LinkText href="/settings" mt={4}>
        Settings
      </LinkText>
      <Divider my={4} />
      <LinkText href="/signout">Log Out</LinkText>
    </>
  )
}

function MenuLinks({
  isOpen,
  user,
  toggleColorMode,
  DarkModeIcon,
}: {
  isOpen: boolean
  user: User
  toggleColorMode: () => void
  DarkModeIcon: JSXElementConstructor<any>
}): JSX.Element {
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
        <IconButton
          onClick={toggleColorMode}
          colorScheme="gray"
          icon={<DarkModeIcon />}
          aria-label="dark mode"
        />
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
                  <Button size="sm" variant="outline" colorScheme="gray">
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
                    <UserLinks user={user} />
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
              <UserLinks user={user} />
            </Box>
          </>
        ) : (
          <>
            <LinkButton size="sm" href="/signup" colorScheme="red">
              Sign up
            </LinkButton>
            <LinkButton size="sm" href="/login" colorScheme="blue">
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
  const { colorMode, toggleColorMode } = useColorMode()
  const isLightMode = colorMode === 'light'
  const DarkModeIcon = isLightMode ? MoonIcon : SunIcon

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Flex py={5} borderBottom="1px" borderColor="gray.100" w="full">
      <Container>
        <Flex align="center" justify="space-between" wrap="wrap">
          <Logo isLightMode={isLightMode} />
          <MenuToggle isOpen={isOpen} toggle={toggle} />
          <MenuLinks
            isOpen={isOpen}
            user={user}
            DarkModeIcon={DarkModeIcon}
            toggleColorMode={toggleColorMode}
          />
        </Flex>
      </Container>
    </Flex>
  )
}
