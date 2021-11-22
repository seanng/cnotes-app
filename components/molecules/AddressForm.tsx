import {
  Box,
  SimpleGrid,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Select,
  GridProps,
} from '@chakra-ui/react'
import FormInput from 'components/atoms/FormInput'
import countries from 'data/countries.json'
import { DeepMap, FieldError, UseFormRegister } from 'react-hook-form'
import { SettingsFormFieldValues } from 'shared/types'

const MAX_COL_WIDTH = 600
const defaultGridProps = {
  templateColumns: ['repeat(1, 1fr)'],
  columnGap: 10,
}

interface Props {
  gridProps?: GridProps
  register: UseFormRegister<SettingsFormFieldValues>
  errors: DeepMap<SettingsFormFieldValues, FieldError>
  registerOptions?: {
    streetAddress?: Record<string, any>
    suite?: Record<string, any>
    state?: Record<string, any>
    city?: Record<string, any>
    country?: Record<string, any>
    zip?: Record<string, any>
  }
}

export default function AddressForm({
  gridProps = defaultGridProps,
  register,
  errors,
  registerOptions = {},
}: Props): JSX.Element {
  return (
    <Grid {...gridProps}>
      <GridItem colSpan={[1, null, 2]}>
        <Box maxW={MAX_COL_WIDTH}>
          <FormControl flex={1} mb={8}>
            <FormLabel>Country</FormLabel>
            <Select variant="rounded" {...register('address.country')}>
              {countries.map(country => (
                <option key={country.code}>{country.name}</option>
              ))}
            </Select>
          </FormControl>
          <FormInput
            label="Street address"
            error={errors.address?.streetAddress}
            variant="outline"
            mb={8}
            inputProps={{
              placeholder: 'eg. 123 Main St.',
              ...register(
                'address.streetAddress',
                registerOptions.streetAddress
              ),
            }}
          />
          <FormInput
            label="Apt, suite. (optional)"
            mb={8}
            variant="outline"
            inputProps={{
              placeholder: 'eg. Apt #7',
              ...register('address.suite', registerOptions.suite),
            }}
          />
          <SimpleGrid spacingY={8} spacingX={5} columns={2} mb={12}>
            <FormInput
              label="City"
              error={errors?.address?.city}
              variant="outline"
              inputProps={{
                placeholder: 'eg. Fremont',
                ...register('address.city', registerOptions.city),
              }}
            />
            <FormInput
              label="State"
              error={errors?.address?.state}
              variant="outline"
              inputProps={{
                placeholder: 'eg. CA',
                ...register('address.state', registerOptions.state),
              }}
            />
            <FormInput
              label="ZIP / Postal Code"
              error={errors?.address?.zip}
              variant="outline"
              inputProps={{
                placeholder: 'eg. 94103',
                ...register('address.zip', registerOptions.zip),
              }}
            />
          </SimpleGrid>
        </Box>
      </GridItem>
    </Grid>
  )
}
