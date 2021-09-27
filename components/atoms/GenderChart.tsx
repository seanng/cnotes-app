import { useColors } from 'utils/colors'
import { Flex, Text, Box, BoxProps } from '@chakra-ui/react'

type Data = {
  male: number // i.e. 30
  female: number // i.e. 70
}

type Props = {
  data: Data
} & BoxProps

export default function GenderChart({ data, ...props }: Props): JSX.Element {
  const { blue, gray, pink } = useColors()
  return (
    <Box w="full" {...props}>
      <Text mb={4} textStyle="micro" color={gray[600]}>
        Audience
      </Text>
      <Flex justify="space-between" mb={2}>
        <Flex align="center">
          <Box w={2} h={2} bgColor={blue[600]} mr={2} />
          <Text color={gray[600]}>Male -&nbsp;</Text>
          <Text color={gray[1000]}>{data.male}%</Text>
        </Flex>
        <Flex align="center">
          <Box w={2} h={2} bgColor={pink[600]} mr={2} />
          <Text color={gray[600]}>Female -&nbsp;</Text>
          <Text color={gray[1000]}>{data.female}%</Text>
        </Flex>
      </Flex>
      <Box w="full" bgColor={pink[600]} h="6px" borderRadius="full">
        <Box
          h="100%"
          w={`${data.male}%`}
          bgColor={blue[600]}
          borderRadius="full"
        />
      </Box>
    </Box>
  )
}
