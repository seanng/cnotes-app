import { FC, ReactNode } from 'react'
import { useColors } from 'hooks'
import { Icon as Iconify } from '@iconify/react'
import {
  FormControl,
  Tooltip,
  Icon,
  FormLabel,
  FormErrorMessage,
  InputLeftElement,
  Input,
  InputGroup,
  FormControlProps,
} from '@chakra-ui/react'

interface Props extends FormControlProps {
  label?: string
  error?: Record<string, any>
  inputProps: Record<string, any>
  hideMessage?: boolean
  helpText?: string
  prefixElement?: ReactNode
}

const FormInput: FC<Props> = ({
  label,
  error,
  inputProps,
  hideMessage,
  helpText,
  prefixElement,
  ...props
}: Props) => {
  const { gray } = useColors()
  return (
    <FormControl isInvalid={!!error} {...props}>
      {label && (
        <FormLabel
          textTransform="none"
          fontWeight={600}
          fontSize="16px"
          color={gray[1000]}
        >
          {label}
          {helpText && (
            <Tooltip label={helpText} hasArrow placement="right">
              <Icon ml={1} mb={1} as={Iconify} icon="bx:bxs-help-circle" />
            </Tooltip>
          )}
        </FormLabel>
      )}
      <InputGroup>
        {prefixElement && (
          <InputLeftElement pointerEvents="none">
            {prefixElement}
          </InputLeftElement>
        )}
        <Input variant="rounded" {...inputProps} />
      </InputGroup>
      {!hideMessage && (
        <FormErrorMessage color="red">{error?.message}</FormErrorMessage>
      )}
    </FormControl>
  )
}

export default FormInput
