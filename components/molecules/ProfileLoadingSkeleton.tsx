import { Box, Skeleton } from '@chakra-ui/react'
import { PROFILE_BODY_WIDTH } from 'shared/metrics'

export default function LoadingSkeleton(): JSX.Element {
  return (
    <>
      <Skeleton
        borderRadius="xl"
        width={356}
        height={600}
        position="sticky"
        top={2}
        alignSelf="flex-start"
        display={['none', null, 'flex']}
      />
      <Box
        width={['100%', null, PROFILE_BODY_WIDTH]}
        pl={[0, null, '5%', 20]}
        mt={-8}
        pb={[285, null, 0]}
      >
        <Skeleton
          borderRadius="xl"
          textStyle={['h3', 'h2']}
          mb={5}
          width="120px"
          height="70px"
        />
        <Skeleton height={228} mb={10} borderRadius="xl" />
        <Skeleton borderRadius="xl" mb={7} width="120px" height="70px" />
        <Skeleton borderRadius="xl" mb={5} height="45px" />
        <Skeleton borderRadius="xl" mb={5} height="45px" />
        <Skeleton borderRadius="xl" mb={5} height="45px" />
      </Box>
    </>
  )
}
