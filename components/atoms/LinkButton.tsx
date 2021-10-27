// import { forwardRef } from 'react'
import Link from 'next/link'
import { forwardRef, Button as CUIButton, ButtonProps } from '@chakra-ui/react'

interface Props extends ButtonProps {
  href: string
}

/**
 * @description Need to wrap the button with <a> tag for SEO purposes
 * @see https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-function-component
 */
const Button = forwardRef<ButtonProps, 'button'>(
  ({ href, ...props }: Props, ref) => (
    <a href={href}>
      <CUIButton ref={ref} {...props} />
    </a>
  )
)

function LinkButton({ href, ...props }: Props): JSX.Element {
  return (
    <Link href={href} prefetch={false} passHref>
      <Button {...props} />
    </Link>
  )
}

export default LinkButton
