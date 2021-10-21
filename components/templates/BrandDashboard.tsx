import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
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
import ArchiveTable from 'components/organisms/ArchiveTable'
import { useColors } from 'hooks'

const tables = [
  {
    label: 'Offers',
    Table: OffersTable,
  },
  {
    label: 'Deals',
    Table: DealsTable,
  },
  {
    label: 'Archive',
    Table: ArchiveTable,
  },
]

interface Props {
  user: User
}

const BrandDashboard: NextPage<Props> = ({ user }: Props) => {
  const [tabIdx, setTabIdx] = useState<number>(0)
  const { gray } = useColors()
  const router = useRouter()

  useEffect(() => {
    const idx = Number(router.query.tab || 0)
    setTabIdx(idx)
  }, [router.query.tab])

  const handleTabChange = (i: number): void => {
    const href = `/dashboard?tab=${i}`
    router.push(href, href, { shallow: true })
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
