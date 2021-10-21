import { FC } from 'react'
import { CloseIcon } from '@chakra-ui/icons'
import { SettingsFormFieldValues, User } from 'shared/types'
import {
  Box,
  Button,
  Select,
  HStack,
  FormControl,
  FormLabel,
  IconButton,
} from '@chakra-ui/react'
import { useColors } from 'hooks'
import {
  Control,
  useFieldArray,
  useWatch,
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

const SponsoredFields = ({ control, i, field, errors, register, children }) => {
  const value = useWatch<SettingsFormFieldValues>({
    name: 'portfolio',
    control,
  })
  const required = value?.[i]?.deliverable !== ''
  return (
    <>
      {required && (
        <FormInput
          display="inline-block"
          mb={4}
          mr={4}
          w={170}
          error={errors.portfolio?.[i]?.companyName}
          label="Sponsor Name"
          hideMessage
          inputProps={{
            defaultValue: field.companyName,
            placeholder: 'eg. Drop',
            ...register(`portfolio.${i}.companyName`, {
              required,
            }),
          }}
        />
      )}
      <HStack display="inline-block">
        {required && (
          <FormInput
            display="inline-block"
            mb={4}
            w={200}
            error={errors.portfolio?.[i]?.companyUrl}
            label="Sponsor URL"
            hideMessage
            inputProps={{
              defaultValue: field.companyUrl,
              placeholder: 'eg. https://dollarshaveclub.com/',
              ...register(`portfolio.${i}.companyUrl`, {
                required,
                pattern: {
                  value: URL_REGEX,
                  message: 'Enter a valid website url',
                },
              }),
            }}
          />
        )}
        {children}
      </HStack>
    </>
  )
}

const Portfolio: FC<Props> = ({ register, control, errors }: Props) => {
  const { fields, append, remove } = useFieldArray({
    name: 'portfolio',
    control,
    shouldUnregister: true,
  })

  const { gray } = useColors()

  return (
    <Box>
      {fields.length === 0 && (
        <Box textStyle="base" mb={8}>
          Add samples to showcase your past work!
        </Box>
      )}

      {fields.map((field, i) => {
        return (
          <Box
            key={field.id}
            pb={5}
            mb={7}
            borderBottom="1px solid"
            borderColor={gray[100]}
          >
            <FormInput
              display="inline-block"
              w={200}
              mb={4}
              mr={4}
              error={errors.portfolio?.[i]?.url}
              label="Media URL"
              inputProps={{
                defaultValue: field.url,
                placeholder: 'eg. https://www.youtube.com/watch?v=l7FV87ocmwM',
                ...register(`portfolio.${i}.url` as const, {
                  required: true,
                  pattern: {
                    value: PLATFORM_URL_REGEX,
                    message: 'Invalid YouTube or TikTok URL',
                  },
                }),
              }}
            />
            <FormControl maxW={150} mr={4} mb={4} display="inline-block">
              <FormLabel>Job Type</FormLabel>
              <Select
                variant="rounded"
                {...register(`portfolio.${i}.deliverable`)}
              >
                <option value={''}>Not sponsored</option>
                <option>Integration</option>
                <option>Dedicated</option>
                <option>I don&apos;t know</option>
              </Select>
            </FormControl>
            <SponsoredFields {...{ control, i, field, errors, register }}>
              <IconButton
                size="sm"
                variant="unstyled"
                aria-label="Remove"
                onClick={(): void => {
                  remove(i)
                }}
                icon={<CloseIcon color="red" fontSize="12px" />}
              />
            </SponsoredFields>
          </Box>
        )
      })}
      <Button
        size="sm"
        onClick={(): void => {
          append({})
        }}
        mb={16}
      >
        Add
      </Button>
    </Box>
  )
}

export default Portfolio
