import {
  DrawerBody,
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
} from '@chakra-ui/react'
import Menu, { MenuProps } from './Menu'

export default function NavbarDrawer(
  props: MenuProps & Omit<DrawerProps, 'children'>
): JSX.Element {
  const menuLinksProps = {
    user: props.user,
    isLightMode: props.isLightMode,
    toggleColorMode: props.toggleColorMode,
  }

  return (
    <Drawer {...props}>
      <DrawerOverlay />
      <DrawerContent maxW={230}>
        <DrawerCloseButton mt={3} />
        <DrawerHeader />
        <DrawerBody>
          <Menu {...menuLinksProps} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
