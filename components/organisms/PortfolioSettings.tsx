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
import {
  PLATFORM_URL_REGEX,
  TIKTOK_URL_REGEX,
  URL_REGEX,
} from 'shared/constants'

type Props = {
  user: User
  register: UseFormRegister<SettingsFormFieldValues>
  control: Control<SettingsFormFieldValues>
  errors: DeepMap<SettingsFormFieldValues, FieldError>
}

const ReactiveFields = ({ control, i, field, errors, register, children }) => {
  const value = useWatch<SettingsFormFieldValues>({
    name: 'portfolio',
    control,
  })
  const required = value?.[i]?.deliverable !== ''
  const isTikTok = TIKTOK_URL_REGEX.test(value?.[i]?.url)
  return (
    <>
      <FormControl
        maxW={150}
        mr={4}
        mb={4}
        display="inline-block"
        verticalAlign="top"
      >
        <FormLabel>Deliverable</FormLabel>
        <Select variant="rounded" {...register(`portfolio.${i}.deliverable`)}>
          {isTikTok ? (
            <>
              <option value={''}>Not sponsored</option>
              <option>Dedicated</option>
            </>
          ) : (
            <>
              <option value={''}>Not sponsored</option>
              <option>Dedicated</option>
              <option>Pre-roll</option>
              <option>Post-roll</option>
              <option>Mid-roll</option>
              <option>Stream</option>
              <option>Short</option>
              <option>I don&apos;t know</option>
            </>
          )}
        </Select>
      </FormControl>
      {required && (
        <FormInput
          display="inline-block"
          verticalAlign="top"
          mb={4}
          mr={4}
          w={170}
          error={errors.portfolio?.[i]?.companyName}
          label="Sponsor name"
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
            verticalAlign="top"
            mb={4}
            w={200}
            error={errors.portfolio?.[i]?.companyUrl}
            label="Sponsor URL"
            inputProps={{
              defaultValue: field.companyUrl,
              placeholder: 'eg. https://dollarshaveclub.com/',
              ...register(`portfolio.${i}.companyUrl`, {
                required,
                pattern: {
                  value: URL_REGEX,
                  message: 'Website URL must be valid and start with https://',
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
              verticalAlign="top"
              w={200}
              mb={4}
              mr={4}
              error={errors.portfolio?.[i]?.url}
              label="Media URL"
              inputProps={{
                defaultValue: field.url,
                placeholder: 'eg. https://youtube.com/watch?v=l7FV87ocmwM',
                ...register(`portfolio.${i}.url` as const, {
                  required: true,
                  pattern: {
                    value: PLATFORM_URL_REGEX,
                    message:
                      'URL must start with https://youtube.com/ or https://tiktok.com/',
                  },
                }),
              }}
            />
            <ReactiveFields {...{ control, i, field, errors, register }}>
              <IconButton
                size="sm"
                // chakra overrides with marginTop:0 due to a pseudo :not class
                marginTop="40px !important"
                variant="unstyled"
                aria-label="Remove"
                onClick={(): void => {
                  remove(i)
                }}
                icon={<CloseIcon color="red" fontSize="12px" />}
              />
            </ReactiveFields>
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
