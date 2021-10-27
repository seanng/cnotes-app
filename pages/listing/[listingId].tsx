import { useRouter } from 'next/router'
import { NextPage, GetServerSideProps } from 'next'
import { BRAND } from 'shared/constants'
import { User } from 'shared/types'
import { getUserPayload } from 'utils/auth'
import { redirTo } from 'utils/helpers'
import BrandListing from 'components/templates/BrandListing'
import CreatorListing from 'components/templates/CreatorListing'
import NotFound from 'components/organisms/404'

interface Props {
  user: User
}

const ListingPage: NextPage<Props> = ({ user }: Props) => {
  const router = useRouter()

  if (!router?.query?.listingId) {
    return <NotFound />
  }

  if (user.role === BRAND) {
    return (
      <BrandListing user={user} listingId={router.query.listingId as string} />
    )
  }

  return (
    <CreatorListing user={user} listingId={router.query.listingId as string} />
  )
}

export default ListingPage

export const getServerSideProps: GetServerSideProps = async ctx => {
  const user = getUserPayload(ctx.req.headers.cookie)
  if (!user) {
    redirTo('/login')
  } else {
    return { props: { user } }
  }
}
