import { useEffect, useState } from 'react'
import Layout from 'components/organisms/Layout'
import {
  Flex,
  Container,
  chakra as c,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react'
import { NextPage } from 'next'
import { useQuery } from '@apollo/client'
import { User } from 'shared/types'
import BiddingTable from 'components/organisms/BiddingTable'
import AwaitingTable from 'components/organisms/AwaitingTable'
import WonTable from 'components/organisms/WonTable'
import HistoryTable from 'components/organisms/HistoryTable'
import gql from 'graphql-tag'

const MyBidsQuery = gql`
  query MyBidsQuery {
    myBids {
      id
      productUrl
      history
      offer {
        id
        platform
        deliverable
        highestBid
        bidCount
        auctionEndsAt
        creator {
          firstName
          lastName
        }
      }
    }
  }
`

const tables = [
  {
    label: 'bidding',
    Table: BiddingTable,
  },
  {
    label: 'awaiting',
    Table: AwaitingTable,
  },
  {
    label: 'won',
    Table: WonTable,
  },
  {
    label: 'history',
    Table: HistoryTable,
  },
]

interface Props {
  user: User
}

const BrandDashboard: NextPage<Props> = ({ user }: Props) => {
  const [tabIdx, setTabIdx] = useState<number>(0)
  const [bids, setBids] = useState([])
  const { data, loading } = useQuery(MyBidsQuery, {
    // fetchPolicy: 'no-cache',
  })

  console.log('bids: ', bids)
  useEffect(() => {
    if (data && data.myBids) {
      setBids(data.myBids)
    }
  }, [data])

  const handleTabChange = (i: number): void => {
    setTabIdx(i)
  }

  return (
    <Layout user={user}>
      {loading ? (
        <div>loading...</div>
      ) : (
        <Container>
          <c.h3 textStyle="h3" mt={20} mb={14}>
            My Deals
          </c.h3>
          <Tabs
            index={tabIdx}
            variant="pill"
            size="sm"
            onChange={handleTabChange}
            isLazy
            lazyBehavior="keepMounted"
          >
            <Flex justify="space-between" align="center" mb={10}>
              <c.div display={['none', 'block']}>
                dropdown placeholder for tab idx: {tabIdx}
              </c.div>
              <TabList>
                {tables.map(({ label }) => (
                  <Tab key={label}>{label}</Tab>
                ))}
              </TabList>
            </Flex>
            <TabPanels>
              {tables.map(({ label, Table }) => (
                <TabPanel key={label}>
                  <Table />
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Container>
      )}
    </Layout>
  )
}

export default BrandDashboard
