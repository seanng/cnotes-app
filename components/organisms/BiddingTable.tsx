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
import { Input } from "@chakra-ui/react"
import { LinkBox, LinkOverlay } from "@chakra-ui/react"
import { Button, ButtonGroup } from "@chakra-ui/react"

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
  'Input', // reserve last column for any button actions
]

export default function BiddingTable({ data }: Props): JSX.Element {
  console.log('data: ', data) // use data variable so eslint doesnt complain
  return (
    <a href="./dashboard">
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
            <Flex align="center">
              <Avatar name="Linus Tech Tips" src="https://bit.ly/dan-abramov" />
              <Flex direction="column" ml={CREATOR_AVATAR_TEXT_SPACING}>
                <Box textStyle="body2">Linus Tech Tips</Box>
                <Box textStyle="caption2">10k viewers</Box>
              </Flex>
            </Flex>
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
          <Td>
            <LinkBox>
            <LinkOverlay href="#">
              <Input placeholder="Enter text here: " size="sm" w="60%">
            </Input>
            <Button size="sm">></Button>
            </LinkOverlay>
            </LinkBox>
          </Td>
        </Tr>
      </Tbody>
    </Table>
    </a>
  )
}
