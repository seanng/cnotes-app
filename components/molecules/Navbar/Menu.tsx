import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { User } from 'shared/types'
import {
  Box,
  Button,
  IconButton,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  Divider,
  PopoverBody,
} from '@chakra-ui/react'
import LinkButton from 'components/atoms/LinkButton'
import { BRAND } from 'shared/constants'
import LinkText from 'components/atoms/LinkText'

function UserLinks({ slug }: { slug: string }): JSX.Element {
  return (
    <>
      <LinkText href="/dashboard">Dashboard</LinkText>
      <LinkText href="/settings" mt={4}>
        Settings
      </LinkText>
      <LinkText isExternal href={`/profile/${slug}`} mt={4}>
        My profile
      </LinkText>
      <Divider my={4} />
      <LinkText href="/signout">Log out</LinkText>
    </>
  )
}

export interface MenuProps {
  isLightMode: boolean
  user: User
  toggleColorMode: () => void
}

export default function MenuLinks({
  isLightMode,
  user,
  toggleColorMode,
}: MenuProps): JSX.Element {
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
              <UserLinks slug={user.slug} />
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
        <UserLinks slug={user.slug} />
      </Box>
    </Stack>
  )
}
