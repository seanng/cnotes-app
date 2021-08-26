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
  Badge,
  IconButton,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { CloseIcon } from '@chakra-ui/icons'
import { CREATOR_AVATAR_TEXT_SPACING } from 'shared/constants'
import { MouseEventHandler, FC } from 'react'

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
  'Highest Bid',
  'My Bid',
  'Status',
  '', // Clear Button
]

const AwaitingTable: FC = () => {
  const handleClick: MouseEventHandler = () => {
    // Clear button handler
  }
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
            <Td>
              <Flex direction="column">
                <Box color="red">5 hours 59 minutes</Box>
                <Box textStyle="caption2">Tuesday, 9:30am</Box>
              </Flex>
            </Td>
            <Td>
              <Flex direction="column">
                <Box>$1,500</Box>
                <Box textStyle="caption2">2 bids</Box>
              </Flex>
            </Td>
            <Td>
              {/* TODO: come up with logic in determining statuses */}
              {/* TODO: add 50, 200, 400 etc to colors.ts so colors will show */}
              <Badge colorScheme="teal">WON</Badge>
            </Td>
            <Td>
              <IconButton
                type="submit"
                aria-label="Bid"
                bgColor="red"
                fontSize="xs"
                onClick={handleClick}
                icon={<CloseIcon />}
              />
            </Td>
          </LinkBox>
        ))}
      </Tbody>
    </Table>
  )
}

export default AwaitingTable
