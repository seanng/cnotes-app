import { HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Container,
  Flex,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react'
import { NAVBAR_HEIGHT } from 'shared/metrics'
import LinkText from 'components/atoms/LinkText'
import Menu from './Menu'
import dynamic from 'next/dynamic'
import { User } from 'shared/types'

const Drawer = dynamic(() => import('./Drawer'))

function Logo({ isLightMode }: { isLightMode: boolean }): JSX.Element {
  return (
    <LinkText href="/" textStyle="h4" color={isLightMode ? 'black' : 'white'}>
      Collabski
    </LinkText>
  )
}

export default function Navbar({ user }: { user: User }): JSX.Element {
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
            <Menu {...menuLinksProps} />
          </Box>
          <Drawer onClose={onClose} isOpen={isOpen} {...menuLinksProps} />
        </Flex>
      </Container>
    </Flex>
  )
}
