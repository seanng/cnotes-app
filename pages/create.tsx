import { GetServerSideProps, NextPage } from 'next'
import 'react-datepicker/dist/react-datepicker.css'
import { getUserPayload, isCreator } from 'utils/auth'
import { redirTo } from 'utils/helpers'
import { User } from 'shared/types'
import CreateListingForm from 'components/templates/CreateListingForm'
import CreateListingSuccess from 'components/templates/CreateListingSuccess'
import { useState } from 'react'

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

export default CreatePage
