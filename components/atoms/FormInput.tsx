import { FC, ReactNode } from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputLeftElement,
  Input,
  InputGroup,
  FormControlProps,
} from '@chakra-ui/react'
import Helptip from 'components/atoms/Helptip'

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
  return (
    <FormControl isInvalid={!!error} {...props}>
      {label && (
        <FormLabel>
          {label}
          {helpText && <Helptip label={helpText} hasArrow placement="right" />}
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
