import { Listing } from 'shared/types'
import { Box } from '@chakra-ui/react'

type Props = {
  listing: Listing
}

export default function SelectingStage({ listing }: Props): JSX.Element {
  console.log('listing: ', listing)
  return <Box>this is the selecting stage</Box>
}
