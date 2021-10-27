import { CLOUDFRONT_URL } from 'shared/constants'
import { useState, useEffect } from 'react'
import { Image, Text } from '@chakra-ui/react'

function divideByTwo(num) {
  return `${num / 2}px`
}

const list = [
  {
    imgSrc: `${CLOUDFRONT_URL}/placeholders/unverified-owl.jpg`,
    height: divideByTwo(962),
    width: divideByTwo(640),
    caption:
      'In the meantime, please enjoy this photo of an owl perched on a bare branch staring right at the camera...',
  },
  {
    imgSrc: `${CLOUDFRONT_URL}/placeholders/unverified-toilet-seat.jpg`,
    height: divideByTwo(864),
    width: divideByTwo(640),
    caption:
      'In the meantime, please enjoy this photo of a toilet seat dressed up as a frog...',
  },
]

export default function AwkwardPhoto() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    setIdx(Math.floor(Math.random() * 100) % list.length)
  }, [])
  const item = list[idx]
  return (
    <>
      <Text textStyle="base" mb={8}>
        {item.caption}
      </Text>
      <Image
        height={item.height}
        width={item.width}
        src={item.imgSrc}
        borderRadius="xl"
        alt="funny-photo"
      />
    </>
  )
}
