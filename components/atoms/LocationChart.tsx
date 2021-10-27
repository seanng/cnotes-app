import { useColors } from 'hooks'
import { LocationBreakdown } from 'shared/types'
import { Flex, Text, Box, BoxProps } from '@chakra-ui/react'

type Props = {
  data: LocationBreakdown[]
} & BoxProps

const hexColors = ['#33F3FF', '#FF1577', '#FFBD15', '#7A0EE5']

export default function LocationChart({ data, ...props }: Props): JSX.Element {
  const { gray } = useColors()

  return (
    <Box w="full" {...props}>
      <Text mb={4} textStyle="micro" color={gray[600]}>
        Location
      </Text>
      <Flex justify="space-between" mb={2}>
        <Box w={120}>
          {/* todo: re-implement chart with small bundle size */}
          {/* <Doughnut
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
              cutout: '85%',
              // @ts-ignore
              borderWidth: 0,
            }}
            data={{
              labels: data.map(c => c.country),
              datasets: [
                {
                  data: data.map(c => c.value),
                  backgroundColor: hexColors,
                },
              ],
            }}
          /> */}
        </Box>
        <Flex w={110} direction="column" justify="center">
          {data.map((item, i) => (
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
