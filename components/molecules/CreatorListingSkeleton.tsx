import { Text, Divider, Skeleton, Container } from '@chakra-ui/react'

export default function CreatorListingSkeleton(): JSX.Element {
  return (
    <>
      <Container mt={4} mb={[6, 10]}>
        <Skeleton w="300px" height="160px" />
      </Container>
      <Divider />
      <Container mt={6}>
        <Skeleton mb={5} w="150px">
          <Text textStyle="h4">yo</Text>
        </Skeleton>
        <Skeleton pt={5} w="100%" maxWidth="700px" h="149px" />
        <Skeleton pt={5} w="100%" maxWidth="700px" h="149px" />
        <Skeleton pt={5} w="100%" maxWidth="700px" h="149px" />
      </Container>
    </>
  )
}
