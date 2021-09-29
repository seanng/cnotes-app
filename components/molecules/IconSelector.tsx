import Slider from 'react-slick'
import Image from 'next/image'
import { Box, BoxProps } from '@chakra-ui/react'

type Props = {
  onSelect: (idx: number) => void
  initialSlideIdx: number
  data: {
    label: string
    url: string
  }[]
} & BoxProps

export default function IconSelector({
  onSelect,
  initialSlideIdx,
  data,
  ...props
}: Props): JSX.Element {
  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    afterChange: onSelect,
    initialSlide: initialSlideIdx,
  }
  return (
    <Box as={Slider} mx="25px" {...settings} {...props}>
      {data.map(item => (
        <Image
          key={item.url}
          src={item.url}
          alt={item.label}
          layout="responsive"
          width={150}
          height={150}
        />
      ))}
    </Box>
  )
}
