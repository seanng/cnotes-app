import { NextPage } from 'next'
import { Listing, User } from 'shared/types'
import Layout from 'components/organisms/Layout'
import { Box, Container } from '@chakra-ui/react'

interface Props {
  user: User
  listing: Listing
}

const BrandListing: NextPage<Props> = ({ user, listing }: Props) => {
  console.log('listing: ', listing)
  return (
    <Layout user={user}>
      <Container>
        <Box>this is the brand listing page</Box>
      </Container>
    </Layout>
  )
}

export default BrandListing
