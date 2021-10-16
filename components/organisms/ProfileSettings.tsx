import {
  Box,
  FormControl,
  FormLabel,
  Flex,
  Avatar,
  Button,
  SimpleGrid,
} from '@chakra-ui/react'
import NextImage from 'next/image'
import Textarea from 'components/atoms/Textarea'
import FormInput from 'components/atoms/FormInput'
import { useRef, FC, ChangeEventHandler } from 'react'
import { FieldError, UseFormRegister, DeepMap } from 'react-hook-form'
import { BRAND, URL_REGEX, PLACEHOLDER_BANNER_URL } from 'shared/constants'
import { SettingsFormFieldValues, User } from 'shared/types'
import { useColors } from 'hooks'

type Props = {
  user: User
  handleAvatarChange: ChangeEventHandler<HTMLInputElement>
  handleAvatarCancelClick: () => void
  handleBannerChange: ChangeEventHandler<HTMLInputElement>
  handleBannerCancelClick: () => void
  register: UseFormRegister<SettingsFormFieldValues>
  errors: DeepMap<SettingsFormFieldValues, FieldError>
  avatarFile: File
  bannerFile: File
}

const ProfileSettings: FC<Props> = ({
  avatarFile,
  bannerFile,
  user,
  handleAvatarCancelClick,
  handleAvatarChange,
  handleBannerChange,
  handleBannerCancelClick,
  register,
  errors,
}: Props) => {
  const avatarUploadInput = useRef(null)
  const bannerUploadInput = useRef(null)
  const isBrand = user.role === BRAND
  const { gray } = useColors()

  const handleAvatarUploadClick = (): void => {
    if (avatarUploadInput.current) {
      avatarUploadInput.current.click()
    }
  }

  const handleBannerUploadClick = (): void => {
    if (bannerUploadInput.current) {
      bannerUploadInput.current.click()
    }
  }

  const bannerUrl = user.bannerUrl || PLACEHOLDER_BANNER_URL

  return (
    <Box maxW={600}>
      <Box h={200} mb={8} position="relative">
        <Box
          as={NextImage}
          borderRadius="xl"
          layout="fill"
          objectFit="cover"
          src={bannerFile ? URL.createObjectURL(bannerFile) : bannerUrl}
        />
        <Flex position="absolute" bottom={4} right={4}>
          <Button
            onClick={handleBannerUploadClick}
            size="sm"
            variant="outline"
            bgColor={gray[50]}
          >
            Upload Cover Photo
          </Button>
          {bannerFile && (
            <Button
              onClick={handleBannerCancelClick}
              size="sm"
              variant="outline"
              color="red"
              bgColor={gray[50]}
              ml={2}
            >
              Cancel
            </Button>
          )}
          <input
            type="file"
            id="file"
            ref={bannerUploadInput}
            style={{ display: 'none' }}
            onChange={handleBannerChange}
            accept="image/*"
          />
        </Flex>
      </Box>
      <Flex mb={8}>
        <Avatar
          size={'2xl'}
          name={`${user.firstName} ${user.lastName}`}
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
          label={isBrand ? 'Website URL' : 'Main Channel URL'}
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
                message: 'Enter a valid website URL (include https)',
              },
            }),
          }}
        />
      </SimpleGrid>
      {!isBrand && (
        <FormInput
          label="What type of creator are you?"
          mb={8}
          inputProps={{
            placeholder: 'eg. Mechanical Keyboard Reviewer',
            ...register('genre'),
          }}
        />
      )}
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
