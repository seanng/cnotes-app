import { useState } from 'react'
import Layout from 'components/organisms/Layout'
import {
  Flex,
  Container,
  Tabs,
  Text,
  Tab,
  // Box,
  TabList,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react'
import { NextPage } from 'next'
import { User } from 'shared/types'
import OffersTable from 'components/organisms/OffersTable'
import DealsTable from 'components/organisms/DealsTable'
import { useColors } from 'hooks'
// import OfferingTable from 'components/organisms/OfferingTable'
// import AwaitingTable from 'components/organisms/AwaitingTable'
// import WonTable from 'components/organisms/WonTable'
// import HistoryTable from 'components/organisms/HistoryTable'

const tables = [
  {
    label: 'Offers',
    Table: OffersTable,
  },
  {
    label: 'Deals',
    Table: DealsTable,
  },
]

interface Props {
  user: User
}

const BrandDashboard: NextPage<Props> = ({ user }: Props) => {
  const [tabIdx, setTabIdx] = useState<number>(0)
  const { gray } = useColors()
  const handleTabChange = (i: number): void => {
    setTabIdx(i)
  }

  return (
    <Layout user={user}>
      <Container pt={9}>
        <Text mb={8} textStyle={['h4', 'h2']}>
          my dashboard
        </Text>
        <Tabs
          index={tabIdx}
          onChange={handleTabChange}
          isLazy
          lazyBehavior="keepMounted"
          variant="new"
        >
          <Flex
            justify="space-between"
            align="center"
            mb={8}
            borderBottom="1px solid"
            borderColor={gray[100]}
          >
            <TabList>
              {tables.map(({ label }, i) => (
                <Tab ml={i === 0 ? 0 : 12} key={label}>
                  {label}
                </Tab>
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
    </Layout>
  )
}

export default BrandDashboard
