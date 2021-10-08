import { Flex, AspectRatio, Text, Container, Box } from '@chakra-ui/react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const list = [
  {
    imgSrc: 'https://i.imgur.com/lKJiT77.png',
    caption:
      'Your dog is cute but honestly a menace. Where are my shoes? Where is my graduation certificate? Where is the chocolate cake I baked for my Aunt’s birthday? And why did you take your dog to the vet on that same Thursday?!',
  },
  {
    imgSrc: 'https://i.imgur.com/Q2BAOd2.png',
    caption:
      'You told your friends you weren’t bringing your phone, to try and experience what travel was like back in the day. You bought a map and a bottle of water and carried your camera for the money shot. But the map was from 2005 and the landscape had changed. So here you are, in the middle of a large field, that the map continues to claim is a local grocer.',
  },
  {
    imgSrc: 'https://i.imgur.com/hkRuanu.png',
    caption:
      'The imposing figure with the trenchcoat shows you the two polaroids. One appears to show the Loch Ness monster herself in the middle of a stretch of dark water. The other shows a sasquatch picking it’s way through a dark forest. You look closer. The animal shapes are drawn on with ink. “This isn’t real!” You scream and throw the polaroids to the floor, sobbing.',
  },
  {
    imgSrc: 'https://i.imgur.com/flHudHE.png',
    caption:
      'You bought a little bracelet for the express purpose of not losing your keys. You put a hook on your door specifically meant for keeping your keys. You briefly attempted to attach your keys to your phone. But here they are. In the dirt. In the park across the street from that bar you used to like but decided the last time you went that you probably wouldn’t go again. You’ll never find them.',
  },
  {
    imgSrc: 'https://i.imgur.com/A040Lxr.png',
    caption:
      'You thought this mission to the moon would be a quick six month thing. Your neighbor offered to look after your dog. Your high school math teacher was impressed. He once said you wouldn’t amount to anything. You sure showed him. But now here you are, fifty feet from your spaceship with no way to get back. Your dog will be so sad. Your math teacher will be so smug. Pretty devastating.',
  },
]

// https://www.kapwing.com/404-illustrations
export default function NotFound(): JSX.Element {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    setIdx(Math.floor(Math.random() * 100) % list.length)
  }, [])

  const item = list[idx]

  return (
    <Container>
      <Flex
        direction="column"
        maxWidth="700px"
        margin="auto"
        align="center"
        pt={5}
      >
        <Text
          mb={10}
          fontSize={['32px', '40px']}
          fontFamily="body"
          fontWeight={700}
          textTransform="capitalize"
        >
          Page Not Found
        </Text>
        <Box width="50%" mb={10}>
          <AspectRatio ratio={1}>
            <Image layout="fill" src={item.imgSrc} />
          </AspectRatio>
        </Box>
        <Text textStyle="base">
          <i>{item.caption}</i>
        </Text>
      </Flex>
    </Container>
  )
}
