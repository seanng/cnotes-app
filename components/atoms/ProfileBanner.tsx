import Image from 'next/image'
import { Box } from '@chakra-ui/react'
import { NAVBAR_HEIGHT } from 'shared/metrics'
import { useTransposeColor } from 'hooks'
import { PLACEHOLDER_BANNER_URL } from 'shared/constants'

const toCssVar = (colorCode: string): string => {
  const [color, hue] = colorCode.split('.')
  return `var(--chakra-colors-${color}-${hue})`
}

interface Props {
  src?: string
}

export default function ProfileBanner({ src }: Props): JSX.Element {
  const bgImage = src || PLACEHOLDER_BANNER_URL
  const bannerBgColor = toCssVar(useTransposeColor('gray.50'))
  return (
    <Box
      h={408}
      mt={NAVBAR_HEIGHT * -1}
      w="100%"
      position="relative"
      zIndex="-1"
    >
      <Image layout="fill" src={bgImage} objectFit="cover" />
      <Box
        position="absolute"
        w="full"
        h="full"
        background={`linear-gradient(${bannerBgColor} 0%, transparent 40%, transparent 70%, ${bannerBgColor} 100%)`}
      />
    </Box>
  )
}
