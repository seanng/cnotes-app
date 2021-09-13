import { FC } from 'react'
import { Badge } from '@chakra-ui/react'

type Props = {
  status: string
}

const OfferStatusBadge: FC<Props> = ({ status }: Props) => {
  // TODO: (after designer) add 50, 200, 400 etc to colors.ts so colors will show
  const colors = {
    WON: 'teal',
    LOST: 'pink',
    SELECTING: 'purple',
    TRANSACTING: 'pink',
    PAYING: 'pink',
  }
  const display = {
    TRANSACTING: 'DELIVERING',
    PAYING: 'OUTSTANDING',
  }
  return (
    <Badge colorScheme={colors[status] || 'teal'}>
      {display[status] || status}
    </Badge>
  )
}

export default OfferStatusBadge
