import { useColors } from 'utils/colors'
import { Doughnut } from 'react-chartjs-2'

import { Flex, Text, Box, BoxProps } from '@chakra-ui/react'
// import { User } from 'shared/types'

type Props = {
  // profile: User
} & BoxProps

const hexColors = ['#33F3FF', '#FF1577', '#FFBD15', '#7A0EE5']

const countries = [
  { country: 'USA', value: 95 },
  { country: 'Mexico', value: 3 },
  { country: 'Europe', value: 1 },
  { country: 'Other', value: 1 },
]

export default function LocationChart({
  // profile,
  ...props
}: Props): JSX.Element {
  const { gray } = useColors()

  return (
    <Box w="full" {...props}>
      <Text mb={4} textStyle="micro" color={gray[600]}>
        Location
      </Text>
      <Flex justify="space-between" mb={2}>
        <Box w={120}>
          <Doughnut
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
              // @ts-ignore
              cutout: '85%',
              borderWidth: 0,
            }}
            data={{
              labels: countries.map(c => c.country),
              datasets: [
                {
                  data: countries.map(c => c.value),
                  backgroundColor: hexColors,
                },
              ],
            }}
          />
        </Box>
        <Flex w={110} direction="column" justify="center">
          {countries.map((item, i) => (
            <Flex key={item.country} justify="space-between" my={1}>
              <Flex align="center">
                <Box bgColor={hexColors[i]} w={2} h={2} mr={2} />
                <Text color={gray[700]}>{item.country}</Text>
              </Flex>
              <Text color={gray[1000]}>{`${item.value}%`}</Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Box>
  )
}
