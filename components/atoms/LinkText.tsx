import { LinkBox } from '@chakra-ui/layout'
import { LinkBoxProps, LinkOverlay } from '@chakra-ui/react'
import NextLink from 'next/link'
import { FC } from 'react'

interface Props extends LinkBoxProps {
  href: string
}

// Link with custom style
const LinkText: FC<Props> = ({ href, children, ...props }: Props) => (
  <LinkBox {...props}>
    <NextLink href={href} passHref>
      <LinkOverlay isExternal>{children}</LinkOverlay>
    </NextLink>
  </LinkBox>
)

export default LinkText
