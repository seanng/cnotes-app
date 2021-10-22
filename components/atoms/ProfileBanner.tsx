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
  isLoading?: boolean
  height?: Array<string | number> | string | number
}

export default function ProfileBanner({
  src,
  isLoading,
  height = [306, null, 408],
}: Props): JSX.Element {
  const bannerBgColor = toCssVar(useTransposeColor('gray.50'))
  const overlayBgColor = isLoading ? toCssVar('gray.500') : 'transparent'
  return (
    <Box
      h={height}
      mt={NAVBAR_HEIGHT * -1}
      w="100%"
      position="relative"
      zIndex="-1"
    >
      {!isLoading && (
        <Image
          layout="fill"
          src={src || PLACEHOLDER_BANNER_URL}
          objectFit="cover"
          alt="banner"
        />
      )}
      <Box
        position="absolute"
        w="full"
        h="full"
        background={`linear-gradient(${bannerBgColor} 0%, ${overlayBgColor} 40%, ${overlayBgColor} 70%, ${bannerBgColor} 100%)`}
      />
    </Box>
  )
}
