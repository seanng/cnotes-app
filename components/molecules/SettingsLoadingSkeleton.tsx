import { Box, SimpleGrid, Skeleton } from '@chakra-ui/react'

export default function SettingsLoadingSkeleton(): JSX.Element {
  return (
    <Box maxW={600}>
      <Skeleton h={200} mb={8} borderRadius="xl" />
      <Skeleton h={180} mb={8} w="60%" borderRadius="xl" />
      <SimpleGrid columns={[1, 2]} spacingX={4}>
        <Skeleton h="80px" mb={8} borderRadius="xl" />
        <Skeleton h="80px" mb={8} borderRadius="xl" />
        <Skeleton h="80px" mb={8} borderRadius="xl" />
        <Skeleton h="80px" mb={8} borderRadius="xl" />
      </SimpleGrid>
      <Skeleton h="80px" mb={8} borderRadius="xl" />
      <Skeleton h="180px" mb={8} borderRadius="xl" />
    </Box>
  )
}
