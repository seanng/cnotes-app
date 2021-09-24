import { useColorModeValue } from '@chakra-ui/react'

const invertHue = {
  '0': '1000',
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
  '1000': '0',
}

export function transpose(lightModeValue: string): string {
  const [color, hue] = lightModeValue.split('.')
  const darkHue = invertHue[hue]
  return `${color}.${darkHue}`
}

export function useTransposeColor(lightModeValue: string): string {
  const darkModeValue = transpose(lightModeValue)
  return useColorModeValue(lightModeValue, darkModeValue)
}

export function useColors(): Record<string, Record<string, string>> {
  return {
    gray: {
      0: useTransposeColor('gray.0'),
      50: useTransposeColor('gray.50'),
      100: useTransposeColor('gray.100'),
      200: useTransposeColor('gray.200'),
      300: useTransposeColor('gray.300'),
      400: useTransposeColor('gray.400'),
      500: useTransposeColor('gray.500'),
      600: useTransposeColor('gray.600'),
      700: useTransposeColor('gray.700'),
      800: useTransposeColor('gray.800'),
      900: useTransposeColor('gray.900'),
      1000: useTransposeColor('gray.1000'),
    },
    pink: {
      50: useTransposeColor('pink.50'),
      100: useTransposeColor('pink.100'),
      200: useTransposeColor('pink.200'),
      300: useTransposeColor('pink.300'),
      400: useTransposeColor('pink.400'),
      500: useTransposeColor('pink.500'),
      600: useTransposeColor('pink.600'),
      700: useTransposeColor('pink.700'),
      800: useTransposeColor('pink.800'),
      900: useTransposeColor('pink.900'),
    },
    blue: {
      50: useTransposeColor('blue.50'),
      100: useTransposeColor('blue.100'),
      200: useTransposeColor('blue.200'),
      300: useTransposeColor('blue.300'),
      400: useTransposeColor('blue.400'),
      500: useTransposeColor('blue.500'),
      600: useTransposeColor('blue.600'),
      700: useTransposeColor('blue.700'),
      800: useTransposeColor('blue.800'),
      900: useTransposeColor('blue.900'),
    },
    cyan: {
      50: useTransposeColor('cyan.50'),
      100: useTransposeColor('cyan.100'),
      200: useTransposeColor('cyan.200'),
      300: useTransposeColor('cyan.300'),
      400: useTransposeColor('cyan.400'),
      500: useTransposeColor('cyan.500'),
      600: useTransposeColor('cyan.600'),
      700: useTransposeColor('cyan.700'),
      800: useTransposeColor('cyan.800'),
      900: useTransposeColor('cyan.900'),
    },
    green: {
      50: useTransposeColor('green.50'),
      100: useTransposeColor('green.100'),
      200: useTransposeColor('green.200'),
      300: useTransposeColor('green.300'),
      400: useTransposeColor('green.400'),
      500: useTransposeColor('green.500'),
      600: useTransposeColor('green.600'),
      700: useTransposeColor('green.700'),
      800: useTransposeColor('green.800'),
      900: useTransposeColor('green.900'),
    },
    red: {
      50: useTransposeColor('red.50'),
      100: useTransposeColor('red.100'),
      200: useTransposeColor('red.200'),
      300: useTransposeColor('red.300'),
      400: useTransposeColor('red.400'),
      500: useTransposeColor('red.500'),
      600: useTransposeColor('red.600'),
      700: useTransposeColor('red.700'),
      800: useTransposeColor('red.800'),
      900: useTransposeColor('red.900'),
    },
    yellow: {
      50: useTransposeColor('yellow.50'),
      100: useTransposeColor('yellow.100'),
      200: useTransposeColor('yellow.200'),
      300: useTransposeColor('yellow.300'),
      400: useTransposeColor('yellow.400'),
      500: useTransposeColor('yellow.500'),
      600: useTransposeColor('yellow.600'),
      700: useTransposeColor('yellow.700'),
      800: useTransposeColor('yellow.800'),
      900: useTransposeColor('yellow.900'),
    },
    purple: {
      50: useTransposeColor('purple.50'),
      100: useTransposeColor('purple.100'),
      200: useTransposeColor('purple.200'),
      300: useTransposeColor('purple.300'),
      400: useTransposeColor('purple.400'),
      500: useTransposeColor('purple.500'),
      600: useTransposeColor('purple.600'),
      700: useTransposeColor('purple.700'),
      800: useTransposeColor('purple.800'),
      900: useTransposeColor('purple.900'),
    },
  }
}
