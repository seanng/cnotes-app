import { GetServerSideProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
// import 'react-datepicker/dist/react-datepicker.css'
import { getUserPayload, isCreator } from 'utils/auth'
import { redirTo } from 'utils/helpers'
import { User } from 'shared/types'
import CreateListingForm from 'components/templates/CreateListingForm'
import { useState } from 'react'
import { withApollo } from 'lib/apollo-client'

const CreateListingSuccess = dynamic(
  () => import('components/templates/CreateListingSuccess')
)

interface Props {
  user: User
}

const CreatePage: NextPage<Props> = ({ user }: Props) => {
  const [shouldShowSuccess, setShouldShowSuccess] = useState(false)
  const handleListingSubmit = (): void => {
    setShouldShowSuccess(true)
  }
  // TODO: handle transitions
  return shouldShowSuccess ? (
    <CreateListingSuccess user={user} />
  ) : (
    <CreateListingForm onListingSubmit={handleListingSubmit} user={user} />
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const user = getUserPayload(ctx.req.headers.cookie)
  if (!isCreator(user)) {
    return redirTo('/')
  }

  return { props: { user } }
}

export default withApollo(CreatePage)
