import { useRouter } from 'next/router'
import { NextPage, GetServerSideProps } from 'next'
import { BRAND } from 'shared/constants'
import { User } from 'shared/types'
import { getUserPayload } from 'utils/auth'
import { redirTo } from 'utils/helpers'
import BrandListing from 'components/templates/BrandListing'
import CreatorListing from 'components/templates/CreatorListing'

interface Props {
  user: User
}

const ListingDetailsPage: NextPage<Props> = ({ user }: Props) => {
  const {
    query: { listingId },
  } = useRouter()

  if (user.role === BRAND) {
    return <BrandListing user={user} listingId={listingId as string} />
  }

  return <CreatorListing user={user} listingId={listingId as string} />
}

export default ListingDetailsPage

export const getServerSideProps: GetServerSideProps = async ctx => {
  const user = getUserPayload(ctx.req.headers.cookie)
  if (!user) {
    return redirTo('/login')
  }

  return { props: { user } }
}
