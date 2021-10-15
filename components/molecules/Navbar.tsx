// import NextLink from 'next/link'
// import Image from 'next/image'
import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import LinkButton from 'components/atoms/LinkButton'
import { User } from 'shared/types'
import { BRAND } from 'shared/constants'
import {
  Box,
  Button,
  IconButton,
  Container,
  Flex,
  DrawerBody,
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  Popover,
  PopoverTrigger,
  useColorMode,
  PopoverContent,
  useDisclosure,
  PopoverArrow,
  PopoverBody,
  Divider,
} from '@chakra-ui/react'
import LinkText from 'components/atoms/LinkText'
import { NAVBAR_HEIGHT } from 'shared/metrics'

type Props = {
  user: User
}

function Logo({ isLightMode }: { isLightMode: boolean }): JSX.Element {
  return (
    <LinkText href="/" textStyle="h4" color={isLightMode ? 'black' : 'white'}>
      cnotes
    </LinkText>
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
  user,
  toggleColorMode,
}: {
  isLightMode: boolean
  user: User
  toggleColorMode: () => void
}): JSX.Element {
  const DarkModeIcon = isLightMode ? MoonIcon : SunIcon
  const popoverBgColor = isLightMode ? 'gray.50' : 'gray.800'

  return (
    <Stack
      spacing={[3]}
      align={['flex-start', 'center']}
      justify={['center', 'space-between', 'flex-end']}
      direction={['column', 'row']}
      pt={[6, 0]}
    >
      <IconButton
        alignSelf="flex-start"
        onClick={toggleColorMode}
        colorScheme="gray"
        icon={<DarkModeIcon />}
        aria-label="dark mode"
      />
      {user ? (
        <>
          {user.role === BRAND && (
            <LinkButton href="/discover" size="sm" mt={[4, 0]}>
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
            pt={4}
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
  )
}

export default function Navbar({ user }: Props): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  const isLightMode = colorMode === 'light'

  const menuLinksProps = {
    user,
    isLightMode,
    toggleColorMode,
  }

  return (
    <Flex minHeight={NAVBAR_HEIGHT} pt={5} w="full">
      <Container>
        <Flex align="center" justify="space-between" wrap="wrap">
          <Logo isLightMode={isLightMode} />
          <Box display={['block', 'none']} onClick={onOpen}>
            <HamburgerIcon />
          </Box>
          <Box display={['none', 'block']}>
            <MenuLinks {...menuLinksProps} />
          </Box>
          <Drawer onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent maxW={230}>
              <DrawerCloseButton mt={3} />
              <DrawerHeader />
              <DrawerBody>
                <MenuLinks {...menuLinksProps} />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Flex>
      </Container>
    </Flex>
  )
}
