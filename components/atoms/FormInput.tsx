import { FC } from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  FormControlProps,
} from '@chakra-ui/react'

interface Props extends FormControlProps {
  label?: string
  error?: Record<string, any>
  inputProps: Record<string, any>
  hideMessage?: boolean
}

const FormInput: FC<Props> = ({
  label,
  error,
  inputProps,
  hideMessage,
  ...props
}: Props) => {
  return (
    <FormControl isInvalid={!!error} {...props}>
      {label && <FormLabel>{label}</FormLabel>}
      <Input {...inputProps} />
      {!hideMessage && (
        <FormErrorMessage color="red">{error?.message}</FormErrorMessage>
      )}
    </FormControl>
  )
}

export default FormInput
