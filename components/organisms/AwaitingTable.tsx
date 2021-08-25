import {
  Avatar,
  Box,
  Flex,
  Table,
  Td,
  Thead,
  Tbody,
  Tr,
  Th,
} from '@chakra-ui/react'
import { CREATOR_AVATAR_TEXT_SPACING } from 'shared/constants'

import { LinkBox, LinkOverlay } from '@chakra-ui/react'

// could move Data to shared/types
type Props = {
  data: []
}

const columns = [
  'Creator',
  'Deliverable',
  'Time Left',
  'Highest Bid',
  'My Bid',
  'Status',
  // reserve last column for any button actions
]

export default function AwaitingTable({ data }: Props): JSX.Element {
  console.log('data: ', data) // use data variable so eslint doesnt complain
  return (
    <LinkBox>
      <Table variant="brandDashboard">
        <Thead>
          <Tr>
            {columns.map(col => (
              <Th key={col}>{col}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>
              <LinkOverlay href="./offer-details">
                <Flex align="center">
                  <Avatar
                    name="Linus Tech Tips"
                    src="https://bit.ly/dan-abramov"
                  />
                  <Flex direction="column" ml={CREATOR_AVATAR_TEXT_SPACING}>
                    <Box textStyle="body2">Linus Tech Tips</Box>
                    <Box textStyle="caption2">10k viewers</Box>
                  </Flex>
                </Flex>
              </LinkOverlay>
            </Td>

            <Td>
              <Flex direction="column">
                <Box textStyle="body2">Integration</Box>
                <Box textStyle="caption2">TikTok</Box>
              </Flex>
            </Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
          </Tr>

          <Tr>
            <Td>
              <Flex align="center">
                <Avatar name="MKBHD" src="https://bit.ly/dan-abramov" />
                <Flex direction="column" ml={CREATOR_AVATAR_TEXT_SPACING}>
                  <Box textStyle="body2">MKBHD</Box>
                  <Box textStyle="caption2">25k viewers</Box>
                </Flex>
              </Flex>
            </Td>
            <Td>
              <Flex direction="column">
                <Box textStyle="body2">Integration</Box>
                <Box textStyle="caption2">YouTube</Box>
              </Flex>
            </Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
          </Tr>
        </Tbody>
      </Table>
    </LinkBox>
  )
}
