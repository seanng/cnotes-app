// import NextLink from 'next/link'
// import Image from 'next/image'
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import LinkButton from 'components/atoms/LinkButton'
import { User } from 'shared/types'
import { useState } from 'react'
import { BRAND } from 'shared/constants'
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
import LinkText from 'components/atoms/LinkText'
import { NAVBAR_HEIGHT } from 'shared/metrics'

type Props = {
  user: User
}

// function Logo({ isLightMode }: { isLightMode: boolean }): JSX.Element {
//   return (
//     <NextLink href="/">
//       <Box as="a" href="/" position="relative" w={128} mr={8} h={10}>
//         <Image
//           layout="fill"
//           src={isLightMode ? '/logo-dark.png' : '/logo-light.png'}
//           objectFit="contain"
//         />
//       </Box>
//     </NextLink>
//   )
// }

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

function UserLinks(): JSX.Element {
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

function MenuLinks({
  isLightMode,
  isOpen,
  user,
  toggleColorMode,
}: {
  isLightMode: boolean
  isOpen: boolean
  user: User
  toggleColorMode: () => void
}): JSX.Element {
  const DarkModeIcon = isLightMode ? MoonIcon : SunIcon
  const popoverBgColor = isLightMode ? 'gray.50' : 'gray.800'
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
            {user.role === BRAND && (
              <LinkButton href="/discover" size="sm">
                Discover
              </LinkButton>
            )}
            <Box display={['none', 'block']}>
              <Popover gutter={16}>
                <PopoverTrigger>
                  <Button size="sm" variant="outline" colorScheme="gray">
                    {user.firstName}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  backgroundColor={popoverBgColor}
                  mr={4}
                  w={220}
                  px={3}
                  py={3}
                >
                  <PopoverArrow
                    backgroundColor={popoverBgColor}
                    borderTopWidth={1}
                    borderLeftWidth={1}
                  />
                  <PopoverBody
                    fontWeight={600}
                    color={isLightMode ? 'gray.600' : 'gray.300'}
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
            <LinkButton size="sm" href="/login" variant="outline">
              Log in
            </LinkButton>
            <LinkButton size="sm" href="/signup">
              Sign up
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

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Flex minHeight={NAVBAR_HEIGHT} pt={5} w="full">
      <Container>
        <Flex align="center" justify="space-between" wrap="wrap">
          <LinkText
            href="/"
            textStyle="h4"
            color={isLightMode ? 'black' : 'white'}
          >
            cnotes
          </LinkText>
          {/* <Logo isLightMode={isLightMode} /> */}
          <MenuToggle isOpen={isOpen} toggle={toggle} />
          <MenuLinks
            isOpen={isOpen}
            user={user}
            isLightMode={isLightMode}
            toggleColorMode={toggleColorMode}
          />
        </Flex>
      </Container>
    </Flex>
  )
}
