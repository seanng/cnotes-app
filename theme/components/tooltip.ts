import { mode } from '@chakra-ui/theme-tools'
import { cssVar } from 'utils/css-var'

const $bg = cssVar('tooltip-bg')
const $arrowBg = cssVar('popper-arrow-bg')

export default {
  baseStyle: props => {
    const bg = mode('gray.700', 'gray.1000')(props)
    return {
      [$bg.variable]: `colors.${bg}`,
      color: 'white',
      [$arrowBg.variable]: [$bg.reference],
      bg: [$bg.reference],
    }
  },
}
