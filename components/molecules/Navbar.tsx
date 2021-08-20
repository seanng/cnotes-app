import Link from 'next/link'
import Image from 'next/image'
import LinkButton from 'components/atoms/LinkButton'
import { Box, Container, Flex } from '@chakra-ui/react'

const nav = [
  {
    url: '/contact',
    title: 'Contact',
  },
]

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

function Logo(): JSX.Element {
  return (
    <Link href="/">
      <Box as="a" href="/" position="relative" w={128} mr={8} h={10}>
        <Image layout="fill" src="/logo-dark.png" objectFit="contain" />
      </Box>
    </Link>
  )
}

export default function Navbar(): JSX.Element {
  // const [show, setShow] = useState(false)
  // const handleToggle = (): void => setShow(!show)

  return (
    <Container py={5} as="header" borderBottom="1px" borderColor="neutrals6">
      <Flex align="center" justify="space-between" wrap="wrap">
        <Flex>
          <Logo />
          <Nav />
        </Flex>
        <Box>
          <LinkButton href="/register" size="sm" bgColor="red" mr={3}>
            Register
          </LinkButton>
          <LinkButton href="/login" size="sm" mr={3}>
            Login
          </LinkButton>
        </Box>
      </Flex>
    </Container>
  )
}
