import { FC } from 'react'
import { SettingsFormFieldValues, User } from 'shared/types'
import { Box, Button, Select, Flex } from '@chakra-ui/react'
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

const PastCollabs: FC<Props> = ({ register, control, errors }: Props) => {
  const { fields: collabFields, append: appendCollab } = useFieldArray({
    name: 'externalCollabs',
    control,
  })

  const handleAddCollabClick = () => {
    appendCollab({})
  }

  return (
    <Box>
      <Box textStyle="hairline1" mb={8}>
        Past Collabs
      </Box>
      {collabFields.map((field, i) => {
        console.log('field: ', field)
        return (
          <Box key={field.id}>
            {/* <Box mb={4} textStyle="body2">{`Past Collab ${i + 1}`}</Box> */}
            <Flex>
              <FormInput
                name={`externalCollabs`}
                errors={errors}
                idx={i}
                hideLabel
                label="url"
                inputProps={{
                  defaultValue: field.url,
                  placeholder: 'URL (Include HTTPS)',
                  ...register(`externalCollabs.${i}.url` as const, {
                    required: true,
                    pattern: {
                      value: URL_REGEX,
                      message: 'Enter a valid website url',
                    },
                  }),
                }}
              />
              <Select w={200} {...register(`externalCollabs.${i}.deliverable`)}>
                <option value={''}>-</option>
                <option>Integration</option>
                <option>Dedicated</option>
                <option>I don&apos;t know</option>
              </Select>
            </Flex>
          </Box>
        )
      })}
      <Button size="sm" variant="outline" onClick={handleAddCollabClick}>
        Add Collab
      </Button>
      {/* <Box textStyle="hairline1" mb={10}>Other Video Samples</Box> */}
    </Box>
  )
}

export default PastCollabs
