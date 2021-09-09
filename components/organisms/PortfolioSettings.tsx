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
import { URL_REGEX } from 'shared/constants'

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
      <Box textStyle="hairline1" mb={8}>
        Past Collabs
      </Box>
      {collabsFields.length === 0 && (
        <Box textStyle="body2" mb={8}>
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
              label="url"
              hideMessage
              inputProps={{
                defaultValue: field.url,
                placeholder: 'eg. https://www.youtube.com/watch?v=l7FV87ocmwM',
                ...register(`collabs.${i}.url` as const, {
                  required: true,
                  pattern: {
                    value: URL_REGEX,
                    message: 'Enter a valid website url',
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
              label="sponsor url"
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
            <Flex position="relative" align="center">
              <FormControl maxW={160} mr={4} mb={4}>
                <FormLabel>Job Type</FormLabel>
                <Select
                  {...register(`collabs.${i}.deliverable`)}
                  _hover={{ borderWidth: 2 }}
                  size="lg"
                  borderWidth={2}
                  borderRadius="xl"
                >
                  <option value={''}>-</option>
                  <option>Integration</option>
                  <option>Dedicated</option>
                  <option>I don&apos;t know</option>
                </Select>
              </FormControl>
              <IconButton
                size="md"
                aria-label="Remove"
                bgColor="red"
                onClick={(): void => {
                  removeCollab(i)
                }}
                icon={<CloseIcon boxSize={2} />}
              />
            </Flex>
          </SimpleGrid>
        )
      })}
      <Button
        size="sm"
        variant="outline"
        onClick={(): void => {
          appendCollab({})
        }}
        mb={16}
      >
        Add Collab
      </Button>
      <Box textStyle="hairline1" mb={8}>
        Highlights
      </Box>
      {samplesFields.length === 0 && (
        <Box textStyle="body2" mb={8}>
          Showcase work that aren&apos;t brand collabs here.
        </Box>
      )}
      {samplesFields.map((field, i) => {
        return (
          <Box key={field.id} display={['block', 'flex']} mb={6}>
            <FormInput
              mb={4}
              error={errors.samples?.[i]?.url}
              label="url"
              hideMessage
              mr={4}
              inputProps={{
                defaultValue: field.url,
                placeholder: 'eg. https://www.youtube.com/watch?v=l7FV87ocmwM',
                ...register(`samples.${i}.url` as const, {
                  required: true,
                  pattern: {
                    value: URL_REGEX,
                    message: 'Enter a valid website url',
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
                size="md"
                aria-label="Remove"
                bgColor="red"
                onClick={(): void => {
                  removeSample(i)
                }}
                icon={<CloseIcon boxSize={2} />}
              />
            </Flex>
          </Box>
        )
      })}
      <Button
        size="sm"
        variant="outline"
        onClick={(): void => {
          appendSample({})
        }}
        mb={12}
      >
        Add Sample
      </Button>
    </Box>
  )
}

export default Portfolio
