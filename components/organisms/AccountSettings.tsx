import { FC } from 'react'
import { Box } from '@chakra-ui/react'
import {
  DeepMap,
  FieldError,
  UseFormRegister,
  useWatch,
  Control,
} from 'react-hook-form'
import { SettingsFormFieldValues } from 'shared/types'
import FormInput from 'components/atoms/FormInput'

type Props = {
  register: UseFormRegister<SettingsFormFieldValues>
  errors: DeepMap<SettingsFormFieldValues, FieldError>
  control: Control<SettingsFormFieldValues>
}

const AccountSettings: FC<Props> = ({ errors, register, control }: Props) => {
  const password = useWatch<SettingsFormFieldValues>({
    name: 'password',
    control,
  })
  return (
    <Box maxW={600}>
      <FormInput
        label="New password"
        mb={8}
        error={errors.password}
        inputProps={{
          type: 'password',
          placeholder: 'Enter your new password',
          ...register('password', {
            minLength: {
              value: 6,
              message: 'Password must have at least 6 characters',
            },
          }),
        }}
      />
      <FormInput
        label="Confirm new password"
        mb={8}
        error={errors.passwordConfirm}
        inputProps={{
          type: 'password',
          placeholder: 'Re-enter your new password',
          ...register('passwordConfirm', {
            validate: v => v === password || 'Your passwords do not match',
          }),
        }}
      />
    </Box>
  )
}

export default AccountSettings
