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
  name: string
  errors?: Record<string, any>
  inputProps: Record<string, any>
  idx?: number
  hideLabel?: boolean
}

const FormInput: FC<Props> = ({
  label,
  hideLabel,
  name,
  errors,
  inputProps,
  idx, // needed to render field array input errors correctly
  ...props
}: Props) => {
  const error =
    idx !== undefined ? errors?.[name]?.[idx]?.[label] : errors?.[name]
  const id = idx !== undefined ? `${name}.${idx}.${label}` : name
  return (
    <FormControl isInvalid={!!error} mb={8} {...props}>
      {!hideLabel && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <Input id={id} {...inputProps} />
      <FormErrorMessage color="red">{error?.message}</FormErrorMessage>
    </FormControl>
  )
}

export default FormInput
