import { useColorModeValue } from '@chakra-ui/react'

const invertHue = {
  '50': '900',
  '100': '800',
  '200': '700',
  '300': '600',
  '400': '500',
  '500': '400',
  '600': '300',
  '700': '200',
  '800': '100',
  '900': '50',
}

export function useColor(lightModeValue: string): string {
  const [color, hue] = lightModeValue.split('.')
  const darkHue = invertHue[hue]
  const darkModeValue = `${color}.${darkHue}`
  return useColorModeValue(lightModeValue, darkModeValue)
}
