import { FC } from 'react'
import { CloseIcon } from '@chakra-ui/icons'
import { SettingsFormFieldValues, User } from 'shared/types'
import {
  Box,
  Button,
  Select,
  Flex,
  SimpleGrid,
  FormControl,
  FormLabel,
  IconButton,
} from '@chakra-ui/react'
import {
  Control,
  useFieldArray,
  UseFormRegister,
  DeepMap,
  FieldError,
} from 'react-hook-form'
import FormInput from 'components/atoms/FormInput'
import { PLATFORM_URL_REGEX, URL_REGEX } from 'shared/constants'

type Props = {
  user: User
  register: UseFormRegister<SettingsFormFieldValues>
  control: Control<SettingsFormFieldValues>
  errors: DeepMap<SettingsFormFieldValues, FieldError>
}

const Portfolio: FC<Props> = ({ register, control, errors }: Props) => {
  const {
    fields: collabsFields,
    append: appendCollab,
    remove: removeCollab,
  } = useFieldArray({
    name: 'collabs',
    control,
    shouldUnregister: true,
  })

  const {
    fields: samplesFields,
    append: appendSample,
    remove: removeSample,
  } = useFieldArray({
    name: 'samples',
    control,
    shouldUnregister: true,
  })

  return (
    <Box>
      <Box textStyle="xLarge" fontWeight={700} mb={8}>
        Past Collabs
      </Box>
      {collabsFields.length === 0 && (
        <Box textStyle="base" mb={8}>
          Worked with brands in the past? Showcase your work here!
        </Box>
      )}
      {collabsFields.map((field, i) => {
        return (
          <SimpleGrid
            key={field.id}
            columns={[1, 2, null, 4]}
            spacingX={4}
            mb={6}
          >
            <FormInput
              mb={4}
              error={errors.collabs?.[i]?.url}
              label="Media URL"
              inputProps={{
                defaultValue: field.url,
                placeholder: 'eg. https://www.youtube.com/watch?v=l7FV87ocmwM',
                ...register(`collabs.${i}.url` as const, {
                  required: true,
                  pattern: {
                    value: PLATFORM_URL_REGEX,
                    message: 'Invalid YouTube or TikTok URL',
                  },
                }),
              }}
            />
            <FormInput
              mb={4}
              error={errors.collabs?.[i]?.description}
              label="Caption"
              hideMessage
              mr={4}
              inputProps={{
                defaultValue: field.companyUrl,
                placeholder: 'Max 250 characters',
                ...register(`collabs.${i}.description` as const, {
                  required: true,
                }),
              }}
            />
            <FormInput
              mb={4}
              error={errors.collabs?.[i]?.companyUrl}
              label="Sponsor URL"
              hideMessage
              inputProps={{
                defaultValue: field.companyUrl,
                placeholder: 'eg. https://dollarshaveclub.com/',
                ...register(`collabs.${i}.companyUrl` as const, {
                  required: true,
                  pattern: {
                    value: URL_REGEX,
                    message: 'Enter a valid website url',
                  },
                }),
              }}
            />
            <Flex position="relative" align="center" justify="space-between">
              <FormControl maxW={180} mr={4} mb={4}>
                <FormLabel>Job Type</FormLabel>
                <Select
                  variant="rounded"
                  {...register(`collabs.${i}.deliverable`)}
                >
                  <option value={''}>-</option>
                  <option>Integration</option>
                  <option>Dedicated</option>
                  <option>I don&apos;t know</option>
                </Select>
              </FormControl>
              <IconButton
                mt={3}
                size="sm"
                borderRadius="full"
                aria-label="Remove"
                colorScheme="red"
                minWidth="40px"
                onClick={(): void => {
                  removeCollab(i)
                }}
                icon={<CloseIcon boxSize={3} />}
              />
            </Flex>
          </SimpleGrid>
        )
      })}
      <Button
        size="sm"
        onClick={(): void => {
          appendCollab({})
        }}
        mb={16}
      >
        Add
      </Button>
      <Box textStyle="xLarge" fontWeight={700} mb={8}>
        Highlights
      </Box>
      {samplesFields.length === 0 && (
        <Box textStyle="base" mb={8}>
          Showcase work that aren&apos;t brand collabs here.
        </Box>
      )}
      {samplesFields.map((field, i) => {
        return (
          <Box key={field.id} display={['block', 'flex']} mb={6}>
            <FormInput
              mb={4}
              error={errors.samples?.[i]?.url}
              label="Media URL"
              mr={4}
              inputProps={{
                defaultValue: field.url,
                placeholder: 'eg. https://www.youtube.com/watch?v=l7FV87ocmwM',
                ...register(`samples.${i}.url` as const, {
                  required: true,
                  pattern: {
                    value: PLATFORM_URL_REGEX,
                    message: 'Invalid YouTube or TikTok URL',
                  },
                }),
              }}
            />
            <Flex w="100%" align="center">
              <FormInput
                mb={4}
                error={errors.samples?.[i]?.description}
                label="Caption"
                hideMessage
                mr={4}
                inputProps={{
                  defaultValue: field.description,
                  placeholder: 'A short description (max 250 chars)',
                  ...register(`samples.${i}.description` as const, {
                    required: true,
                  }),
                }}
              />
              <IconButton
                mt={3}
                size="sm"
                borderRadius="full"
                minWidth="40px"
                aria-label="Remove"
                colorScheme="red"
                onClick={(): void => {
                  removeSample(i)
                }}
                icon={<CloseIcon boxSize={3} />}
              />
            </Flex>
          </Box>
        )
      })}
      <Button
        size="sm"
        onClick={(): void => {
          appendSample({})
        }}
        mb={12}
      >
        Add
      </Button>
    </Box>
  )
}

export default Portfolio
