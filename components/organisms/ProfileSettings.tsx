import {
  Textarea,
  Box,
  FormControl,
  FormLabel,
  Flex,
  Avatar,
  Button,
  SimpleGrid,
} from '@chakra-ui/react'
import FormInput from 'components/atoms/FormInput'
import { useRef, FC, ChangeEventHandler } from 'react'
import { FieldError, UseFormRegister, DeepMap } from 'react-hook-form'
import { BRAND, URL_REGEX } from 'shared/constants'
import { SettingsFormFieldValues, User } from 'shared/types'

type Props = {
  user: User
  handleAvatarChange: ChangeEventHandler<HTMLInputElement>
  handleAvatarCancelClick: () => void
  register: UseFormRegister<SettingsFormFieldValues>
  errors: DeepMap<SettingsFormFieldValues, FieldError>
  avatarFile: File
}

const ProfileSettings: FC<Props> = ({
  avatarFile,
  user,
  handleAvatarCancelClick,
  handleAvatarChange,
  register,
  errors,
}: Props) => {
  const avatarUploadInput = useRef(null)
  const isBrand = user.role === BRAND

  const handleAvatarUploadClick = (): void => {
    if (avatarUploadInput.current) {
      avatarUploadInput.current.click()
    }
  }

  return (
    <Box maxW={600}>
      <Flex mb={8}>
        <Avatar
          size={'2xl'}
          name="Linus Tech Tips"
          src={avatarFile ? URL.createObjectURL(avatarFile) : user.avatarUrl}
          mr={6}
        />
        <Flex direction="column" justifyContent="center">
          <Box mb={2} textStyle="base">
            Profile Photo
          </Box>
          <Box textStyle="mini" color="gray.600" mb={3}>
            We recommend an image of at least 400 x 400
          </Box>
          <Flex>
            <Button
              onClick={handleAvatarUploadClick}
              size="sm"
              variant="outline"
            >
              Upload
            </Button>
            {avatarFile && (
              <Button
                onClick={handleAvatarCancelClick}
                size="sm"
                variant="outline"
                color="red"
                ml={2}
              >
                Cancel
              </Button>
            )}
          </Flex>
          <input
            type="file"
            id="file"
            ref={avatarUploadInput}
            style={{ display: 'none' }}
            onChange={handleAvatarChange}
            accept="image/*"
          />
        </Flex>
      </Flex>
      <SimpleGrid columns={[1, 2]} spacingX={4}>
        <FormInput
          label="First Name"
          mb={8}
          error={errors.firstName}
          inputProps={{
            placeholder: 'eg. Steven',
            ...register('firstName', {
              required: true,
            }),
          }}
          mr={[0, 4]}
        />
        <FormInput
          label="Last Name"
          mb={8}
          error={errors.lastName}
          inputProps={{
            placeholder: 'eg. Smith',
            ...register('lastName', {
              required: true,
            }),
          }}
        />
        <FormInput
          label={isBrand ? 'Company Name' : 'Creator Name'}
          error={errors.alias}
          mb={8}
          inputProps={{
            placeholder: isBrand ? 'eg. Spotify Ltd.' : 'eg. Grapplr',
            ...register('alias', {
              required: true,
            }),
          }}
        />
        <FormInput
          label={
            isBrand ? 'Website URL (Include HTTPS)' : 'Main URL (Include HTTPS)'
          }
          mb={8}
          error={errors.websiteUrl}
          inputProps={{
            placeholder: isBrand
              ? 'eg. https://drop.com'
              : 'eg. https://www.youtube.com/channel/UCfRKvxo',
            ...register('websiteUrl', {
              required: true,
              pattern: {
                value: URL_REGEX,
                message: 'Enter a valid website url',
              },
            }),
          }}
        />
      </SimpleGrid>
      <FormControl>
        <FormLabel htmlFor="about">{isBrand ? 'About Us' : 'Bio'}</FormLabel>
        <Textarea
          placeholder={
            isBrand
              ? `eg. We're a website that sells figurines and other anime merchandise to fans in Scandinavia!`
              : `eg. I'm a passionate, easy going creator that loves sharing tech gadgets with my amazing community!`
          }
          mb={10}
          {...register('about')}
        />
      </FormControl>
    </Box>
  )
}
export default ProfileSettings
