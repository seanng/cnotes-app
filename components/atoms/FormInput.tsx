import { FC } from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react'

type Props = {
  label: string
  name: string
  errors: Record<string, any>
  inputProps: Record<string, any>
}

const FormInput: FC<Props> = ({
  label,
  name,
  errors,
  inputProps,
  ...props
}: Props) => {
  return (
    <FormControl isInvalid={errors[name]} mb={8} {...props}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input id={name} {...inputProps} />
      <FormErrorMessage color="red">
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  )
}

export default FormInput
