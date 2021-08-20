import Navbar from 'components/molecules/Navbar'
import { User } from 'shared/types'

type Props = {
  children: JSX.Element
  user?: User
}

export default function Layout({ children, user }: Props): JSX.Element {
  return (
    <>
      <Navbar user={user} />
      {children}
      {/* TODO: Footer */}
    </>
  )
}
