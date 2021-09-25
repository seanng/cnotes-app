import Navbar from 'components/molecules/Navbar'
import { Box } from '@chakra-ui/react'
import { User } from 'shared/types'

type Props = {
  children: JSX.Element | JSX.Element[]
  user?: User
}

export default function Layout({ children, user }: Props): JSX.Element {
  return (
    <>
      <Navbar user={user} />
      {children}
      <Box pt={20} />
      {/* TODO: Footer */}
    </>
  )
}
