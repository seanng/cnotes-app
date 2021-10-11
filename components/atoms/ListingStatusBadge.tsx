import { FC } from 'react'
import { Badge } from '@chakra-ui/react'
import { ACTIVE, AWAITING } from 'shared/constants'
// import { useColors } from 'hooks'

type Props = {
  status: string
}

const ListingStatusBadge: FC<Props> = ({ status }: Props) => {
  // const { cyan, yellow } = useColors()
  const statusProps = {
    [ACTIVE]: {
      color: 'black',
      bgColor: 'cyan.500',
    },
    [AWAITING]: {
      color: 'black',
      bgColor: 'yellow.400',
    },
  }

  const display = {
    TRANSACTING: 'DELIVERING',
    PAYING: 'OUTSTANDING',
  }
  return (
    <Badge px={2} borderRadius="full" {...statusProps[status]}>
      {display[status] || status}
    </Badge>
  )
}

export default ListingStatusBadge
