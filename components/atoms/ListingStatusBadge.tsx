import { FC } from 'react'
import { Badge } from '@chakra-ui/react'
import {
  ACTIVE,
  AWAITING,
  CANCELLED,
  PAYING,
  REJECTED,
  SUBMITTING,
} from 'shared/constants'
import { useColors } from 'hooks'

type Props = {
  status: string
}

const ListingStatusBadge: FC<Props> = ({ status }: Props) => {
  const { cyan } = useColors()
  const statusProps = {
    [SUBMITTING]: {
      color: 'black',
      bgColor: 'yellow.400',
    },
    [PAYING]: {
      color: 'white',
      bgColor: 'pink.500',
    },
    [ACTIVE]: {
      color: 'black',
      bgColor: cyan[500],
    },
    [AWAITING]: {
      color: 'black',
      bgColor: 'yellow.400',
    },
    [REJECTED]: {
      color: 'black',
      bgColor: 'gray.400',
    },
    [CANCELLED]: {
      color: 'black',
      bgColor: 'gray.400',
    },
  }

  const display = {
    TRANSACTING: 'DELIVERING',
    PAYING: 'OUTSTANDING',
    [SUBMITTING]: 'Submitting Video',
    [PAYING]: 'Payment Outstanding',
  }
  return (
    <Badge px={2} borderRadius="full" {...statusProps[status]}>
      {display[status] || status}
    </Badge>
  )
}

export default ListingStatusBadge
