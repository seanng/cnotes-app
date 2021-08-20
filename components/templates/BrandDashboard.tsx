import { useState } from 'react'
import Layout from 'components/organisms/Layout'
import BiddingTable from 'components/organisms/BiddingTable'
import WonTable from 'components/organisms/WonTable'
import AwaitingTable from 'components/organisms/AwaitingTable'
import HistoryTable from 'components/organisms/HistoryTable'
import {
  Flex,
  Container,
  chakra as c,
  ButtonGroup,
  Button,
} from '@chakra-ui/react'

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

function BrandDashboardTemplate(): JSX.Element {
  const [activeTabIdx, setActiveTabIdx] = useState<number>(0)
  const handleTabClick = (i: number) => (): void => setActiveTabIdx(i)
  const { component: Table } = tables[activeTabIdx]
  return (
    <Layout>
      <Container>
        <c.h3 textStyle="h3" mt={20} mb={14}>
          My Deals
        </c.h3>
        <Flex justify="space-between" align="center" mb={10}>
          <c.div display={['none', 'block']}>
            dropdown placeholder for tab idx: {activeTabIdx}
          </c.div>
          <ButtonGroup variant="tab" size="sm">
            {tables.map(({ label }, i) => (
              <Button
                key={label}
                onClick={handleTabClick(i)}
                isActive={activeTabIdx === i}
              >
                {label}
              </Button>
            ))}
          </ButtonGroup>
        </Flex>
        <Table data={[]} />
      </Container>
    </Layout>
  )
}

export default BrandDashboardTemplate
