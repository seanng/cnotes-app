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
import { useQuery, gql } from '@apollo/client'
import { User } from 'shared/types'
import OfferingTable from 'components/organisms/OfferingTable'
import AwaitingTable from 'components/organisms/AwaitingTable'
import WonTable from 'components/organisms/WonTable'
import HistoryTable from 'components/organisms/HistoryTable'

const MY_BIDS = gql`
  query myOffers {
    myOffers {
      id
      isCleared
      history {
        productUrl
        price
        message
      }
      listing {
        id
        platform
        deliverable
        status
        brand {
          id
        }
        highestOffer
        offerCount
        auctionEndsAt
        creator {
          alias
          avatarUrl
        }
        completedAt
      }
    }
  }
`

const tables = [
  {
    label: 'offering',
    Table: OfferingTable,
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
  const [offers, setOffers] = useState([])
  const { data, loading } = useQuery(MY_BIDS, {
    // fetchPolicy: 'no-cache',
  })

  useEffect(() => {
    if (data && data.myOffers) {
      setOffers(data.myOffers)
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
        <Container overflowX="scroll">
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
              <TabList>
                {tables.map(({ label }) => (
                  <Tab key={label}>{label}</Tab>
                ))}
              </TabList>
              {/* <c.div display={['none', 'block']}>
                dropdown placeholder for tab idx: {tabIdx}
              </c.div> */}
            </Flex>
            <TabPanels>
              {offers &&
                tables.map(({ label, Table }) => (
                  <TabPanel key={label}>
                    <Table user={user} />
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
