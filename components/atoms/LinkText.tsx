import { LinkBox } from '@chakra-ui/layout'
import { LinkBoxProps, LinkOverlay } from '@chakra-ui/react'
import NextLink from 'next/link'
import { FC } from 'react'

interface Props extends LinkBoxProps {
  href: string
  isExternal?: boolean
}

// Link with custom style
const LinkText: FC<Props> = ({
  href,
  children,
  isExternal,
  ...props
}: Props) => (
  <LinkBox {...props}>
    <NextLink prefetch={false} href={href} passHref>
      <LinkOverlay isExternal={isExternal}>{children}</LinkOverlay>
    </NextLink>
  </LinkBox>
)

export default LinkText
