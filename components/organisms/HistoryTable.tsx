import {
  Th,
  Table,
  Thead,
  Tbody,
  Avatar,
  Box,
  Flex,
  Td,
  Tr,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { CREATOR_AVATAR_TEXT_SPACING } from 'shared/constants'
import { FC } from 'react'
import { Bid, User } from 'shared/types'

const data = [
  {
    id: 'abcdef',
    creator: {
      id: 'gfisdj',
      role: 'CREATOR',
      status: 'VERIFIED',
      firstName: 'Linus',
      lastName: 'Tech Tips',
      email: 'abc@abc.com',
      viewerCount: 100000,
    },
    platform: 'YouTube',
    deliverable: 'Integration',
  },
  {
    id: 'abcdddef',
    creator: {
      id: 'gfisffdj',
      role: 'CREATOR',
      status: 'VERIFIED',
      firstName: 'Linus',
      lastName: 'Tech Tips',
      email: 'abc@abc.com',
      viewerCount: 100000,
    },
    platform: 'YouTube',
    deliverable: 'Integration',
  },
  {
    id: 'abcde123f',
    creator: {
      id: 'gf12isdj',
      role: 'CREATOR',
      status: 'VERIFIED',
      firstName: 'Linus',
      lastName: 'Tech Tips',
      email: 'abc@abc.com',
      viewerCount: 100000,
    },
    platform: 'YouTube',
    deliverable: 'Integration',
  },
]

const columns = [
  'Creator',
  'Deliverable',
  'Time Left',
  'Activation Range',
  'Date Completed',
]

type Props = {
  user: User
  data: Bid[]
}

const HistoryTable: FC<Props> = () => {
  return (
    <Table variant="brandDashboard">
      <Thead>
        <Tr>
          {columns.map(col => (
            <Th key={col}>{col}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data.map(offer => (
          <LinkBox
            as={Tr}
            transform="scale(1)"
            cursor="pointer"
            _hover={{ shadow: 'md' }}
            textStyle="body2"
            key={offer.id}
          >
            <Td>
              <NextLink href={`/offer/${offer.id}`} passHref>
                <LinkOverlay>
                  <Flex align="center">
                    <Avatar
                      name="Linus Tech Tips"
                      src="https://bit.ly/dan-abramov"
                    />
                    <Flex direction="column" ml={CREATOR_AVATAR_TEXT_SPACING}>
                      <Box>Linus Tech Tips</Box>
                      <Box textStyle="caption2">10k viewers</Box>
                    </Flex>
                  </Flex>
                </LinkOverlay>
              </NextLink>
            </Td>
            <Td>
              <Flex direction="column">
                <Box>Integration</Box>
                <Box textStyle="caption2">TikTok</Box>
              </Flex>
            </Td>
            <Td>$1,200</Td>
            <Td>09/20 - 10/04</Td>
            <Td>10/05/21</Td>
          </LinkBox>
        ))}
      </Tbody>
    </Table>
  )
}

export default HistoryTable
