import { useMutation, gql } from '@apollo/client'
import { Listing } from 'shared/types'
import StageHeading from 'components/molecules/StageHeading'
import { Button, Container, Text } from '@chakra-ui/react'

const RESET_LISTING = gql`
  mutation resetListing($id: ID!) {
    resetListing(id: $id) {
      id
      status
      auctionEndsAt
    }
  }
`

type Props = {
  listing: Listing
}

export default function NoOffersStage({ listing }: Props): JSX.Element {
  const [resetListing] = useMutation(RESET_LISTING)

  const handleClick = async () => {
    await resetListing({
      variables: { id: listing.id },
    })
  }

  return (
    <>
      <StageHeading data={listing} />
      <Container textStyle="base" mt={[6, 10]} mb={110}>
        <Text textStyle="h4" mb={[5, 8]}>
          Your listing has ended
        </Text>
        <Text mb={3}>
          Unfortunately, there are no brands that have placed offers this time,
          would you like to repost this listing?
        </Text>
        <Text mb={9}>This will restart the timer and the listing status.</Text>
        <Button size="sm" onClick={handleClick}>
          Repost Listing
        </Button>
      </Container>
    </>
  )
}
