import { FC } from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import { DeepMap, FieldError, UseFormRegister } from 'react-hook-form'
import { SettingsFormFieldValues, User } from 'shared/types'
import FormInput from 'components/atoms/FormInput'

type Props = {
  user: User
  register: UseFormRegister<SettingsFormFieldValues>
  errors: DeepMap<SettingsFormFieldValues, FieldError>
}

const SocialSettings: FC<Props> = ({ errors, register }: Props) => {
  return (
    <SimpleGrid columns={[1, 2]} spacingX={4} maxW={600}>
      <FormInput
        label="YouTube URL (optional)"
        mb={8}
        error={errors.youtubeUrl}
        inputProps={{
          placeholder: 'https://www.youtube.com/c/RickastleyCoUkOfficial',
          ...register('youtubeUrl', {
            pattern: {
              value:
                /(https?|http?):\/\/(www\.)?(youtube)\.com\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
              message: 'Enter a valid YouTube URL (include https)',
            },
          }),
        }}
      />
      <FormInput
        label="TikTok URL (optional)"
        mb={8}
        error={errors.tiktokUrl}
        inputProps={{
          placeholder: 'http://tiktok.com/@architechnology',
          ...register('tiktokUrl', {
            pattern: {
              value:
                /(https?|http?):\/\/(www\.)?(tiktok)\.com\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
              message: 'Enter a valid TikTok URL (include https)',
            },
          }),
        }}
      />
      <FormInput
        label="Facebook URL (optional)"
        mb={8}
        error={errors.facebookUrl}
        inputProps={{
          placeholder: 'https://facebook.com/xxxx',
          ...register('facebookUrl', {
            pattern: {
              value:
                /(https?|http?):\/\/(www\.)?(facebook|fb)\.com\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
              message: 'Enter a valid Facebook URL (include https)',
            },
          }),
        }}
      />
      <FormInput
        label="Instagram URL (optional)"
        mb={8}
        error={errors.instagramUrl}
        inputProps={{
          placeholder: 'https://instagram.com/xxxx',
          ...register('instagramUrl', {
            pattern: {
              value:
                /(https?|http?):\/\/(www\.)?(instagram)\.com\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
              message: 'Enter a valid Instagram URL (include https)',
            },
          }),
        }}
      />
    </SimpleGrid>
  )
}

export default SocialSettings
