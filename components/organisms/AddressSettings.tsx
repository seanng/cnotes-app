import AddressForm from 'components/molecules/AddressForm'
import { FC } from 'react'
import { DeepMap, FieldError, UseFormRegister, Control } from 'react-hook-form'
import { Text } from '@chakra-ui/react'
import { SettingsFormFieldValues } from 'shared/types'
import { useColors } from 'hooks'

interface Props {
  register: UseFormRegister<SettingsFormFieldValues>
  errors: DeepMap<SettingsFormFieldValues, FieldError>
  control: Control<SettingsFormFieldValues>
}

const AddressSettings: FC<Props> = ({ errors, register }: Props) => {
  const { gray } = useColors()
  return (
    <>
      <Text textStyle="base" color={gray[700]} mb={8}>
        Use a permanent address where you can receive the product.
      </Text>
      <AddressForm register={register} errors={errors} />
    </>
  )
}

export default AddressSettings
