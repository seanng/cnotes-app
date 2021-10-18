import { Icon, Tooltip, TooltipProps } from '@chakra-ui/react'
import { Icon as Iconify } from '@iconify/react'

export default function Helptip(
  props: Omit<TooltipProps, 'children'>
): JSX.Element {
  return (
    <Tooltip {...props}>
      <Icon
        as={Iconify}
        mb={1}
        ml={1}
        icon="bx:bxs-help-circle"
        cursor="pointer"
      />
    </Tooltip>
  )
}
