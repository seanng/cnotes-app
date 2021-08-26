import { useState } from 'react'
import BiddingTable from 'components/organisms/BiddingTable'
import WonTable from 'components/organisms/WonTable'
import Layout from 'components/organisms/Layout'
import AwaitingTable from 'components/organisms/AwaitingTable'
import HistoryTable from 'components/organisms/HistoryTable'
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
import { User } from 'shared/types'

const tables = [
  {
    label: 'bidding',
    component: BiddingTable,
  },
  {
    label: 'awaiting',
    component: AwaitingTable,
  },
  {
    label: 'won',
    component: WonTable,
  },
  {
    label: 'history',
    component: HistoryTable,
  },
]

interface Props {
  user: User
}

const BrandDashboardTemplate: NextPage<Props> = ({ user }: Props) => {
  const [tabIdx, setTabIdx] = useState<number>(0)
  const handleTabChange = (i: number): void => setTabIdx(i)
  return (
    <Layout user={user}>
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
            {tables.map(({ label, component: Table }) => (
              <TabPanel key={label}>
                <Table data={[]} />
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Container>
    </Layout>
  )
}

export default BrandDashboardTemplate
