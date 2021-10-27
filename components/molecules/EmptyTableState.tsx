import NextImage from 'next/image'
import {
  Text,
  AspectRatio,
  Box,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react'
import LinkButton from 'components/atoms/LinkButton'
import { CLOUDFRONT_URL } from 'shared/constants'
import { useColors } from 'hooks'

const darkImgSrc = `${CLOUDFRONT_URL}/assets/brand-dash-empty-dark.png`
const lightImgSrc = `${CLOUDFRONT_URL}/assets/brand-dash-empty-light.png`

interface Props {
  heading?: string
  body?: string
}

export default function EmptyTableState({ heading, body }: Props): JSX.Element {
  const imgSrc = useColorModeValue(lightImgSrc, darkImgSrc)
  const { gray } = useColors()
  return (
    <Flex direction="column" align="center">
      <Box width="100%" maxWidth="800px" textAlign="center">
        <AspectRatio ratio={362 / 114} mb={[8, 12]}>
          <NextImage layout="fill" src={imgSrc} />
        </AspectRatio>
        <Text fontSize={['16px', '24px']} mb={[2, 4]} fontWeight={600}>
          {heading}
        </Text>
        <Text textStyle={['small', 'base']} color={gray[700]} mb={[8, 12]}>
          {body}
        </Text>
        <LinkButton href="/discover">Take me to the discover page</LinkButton>
      </Box>
    </Flex>
  )
}
