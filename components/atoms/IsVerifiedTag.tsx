import { Text, Icon, TextProps } from '@chakra-ui/react'
import { Icon as Iconify } from '@iconify/react'
import { useColors } from 'hooks'

export default function IsVerifiedTag(props: TextProps): JSX.Element {
  const { green } = useColors()
  return (
    <Text as="span" textStyle="nano" color={green[600]} {...props}>
      <Icon as={Iconify} mr={1} icon="akar-icons:circle-check-fill" />
      verified
    </Text>
  )
}
