import { Skeleton } from '@chakra-ui/react'

export default function TableLoadingSkeleton(): JSX.Element {
  return (
    <>
      <Skeleton height="40px" w="85%" />
      <Skeleton height="76px" mt="5px" w="100%" />
      <Skeleton height="76px" mt="5px" w="100%" />
      <Skeleton height="76px" mt="5px" w="100%" />
      <Skeleton height="76px" mt="5px" w="100%" />
    </>
  )
}
