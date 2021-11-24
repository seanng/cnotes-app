import * as Sentry from '@sentry/nextjs'
import {
  Box,
  Container,
  Divider,
  Grid,
  GridItem,
  Flex,
  chakra,
  Text,
  FormControl,
  FormLabel,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  SelectProps,
  Spacer,
  Select,
  FlexProps,
} from '@chakra-ui/react'
import { useQuery, useMutation, gql } from '@apollo/client'
import { useEffect, useState } from 'react'
import FormInput from 'components/atoms/FormInput'
import Textarea from 'components/atoms/Textarea'
import { NextPage } from 'next'
import { useColors } from 'hooks'
import Layout from 'components/organisms/Layout'
import { useForm } from 'react-hook-form'
import omit from 'ramda/src/omit'
import set from 'ramda/src/set'
import pipe from 'ramda/src/pipe'
import lensProp from 'ramda/src/lensProp'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import IconSelector from 'components/molecules/IconSelector'
// import DatePicker from 'components/atoms/DatePicker'
// import 'react-datepicker/dist/react-datepicker.css'
import { S3_LISTING_ICONS_FOLDER } from 'shared/constants'
import { User, Address } from 'shared/types'
import AddressForm from 'components/molecules/AddressForm'

const MAX_COL_WIDTH = 600

const MY_ADDRESS = gql`
  query me {
    me {
      id
      address
    }
  }
`

const CREATE_LISTING = gql`
  mutation createListing($input: CreateListingInput!) {
    createListing(input: $input) {
      id
      creator {
        id
        address
      }
    }
  }
`

type OnSubmitProps = {
  platform: string
  deliverable: string
  deliveryStartsAt: string
  deliveryEndsAt: string
  description: string
  canReuse: string
  willFollowScript: string
  previewTime: string
  numberOfRevisions: string
  address: Address
}

interface Props {
  user: User
  onListingSubmit: () => void
}

const icons = [
  { label: 'ball', url: `${S3_LISTING_ICONS_FOLDER}/1.png` },
  { label: 'bar', url: `${S3_LISTING_ICONS_FOLDER}/2.png` },
  { label: 'bar2', url: `${S3_LISTING_ICONS_FOLDER}/3.png` },
  { label: 'cone', url: `${S3_LISTING_ICONS_FOLDER}/4.png` },
  { label: 'cube', url: `${S3_LISTING_ICONS_FOLDER}/5.png` },
  { label: 'cube2', url: `${S3_LISTING_ICONS_FOLDER}/6.png` },
  { label: 'cylinder', url: `${S3_LISTING_ICONS_FOLDER}/7.png` },
  { label: 'donut', url: `${S3_LISTING_ICONS_FOLDER}/8.png` },
  { label: 'donut2', url: `${S3_LISTING_ICONS_FOLDER}/9.png` },
  { label: 'tube', url: `${S3_LISTING_ICONS_FOLDER}/10.png` },
]

interface AdvancedRowProps extends FlexProps {
  label: string
  selectProps: SelectProps
  description?: string
}

function AdvancedRow({
  label,
  selectProps,
  description,
}: AdvancedRowProps): JSX.Element {
  const { gray } = useColors()
  return (
    <Flex mb={6} align="center">
      <Flex direction="column">
        <Box mb={1}>{label}</Box>
        {description && (
          <Box textStyle="small" fontWeight={400} color={gray[600]}>
            {description}
          </Box>
        )}
      </Flex>
      <Spacer />
      <Select w="110px" minW="110px" variant="rounded" {...selectProps} />
    </Flex>
  )
}

const CreateListingForm: NextPage<Props> = ({
  user,
  onListingSubmit,
}: Props) => {
  const [selectedIconIdx, setSelectedIconIdx] = useState(0)
  const { data } = useQuery(MY_ADDRESS, {
    fetchPolicy: 'cache-and-network',
  })
  const [createListing] = useMutation(CREATE_LISTING)
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
  const { gray } = useColors()

  useEffect(() => {
    if (data?.me) reset({ address: data.me.address })
  }, [data])

  const onSubmit = async (data: OnSubmitProps): Promise<void> => {
    try {
      const input = pipe(
        omit([
          'numberOfRevisions',
          'previewTime',
          'canReuse',
          'willFollowScript',
        ]),
        set(lensProp('specs'), {})
      )(data)

      input.specs = {
        numberOfRevisions: data.numberOfRevisions,
        previewTime: data.previewTime,
        canReuse: data.canReuse,
        willFollowScript: data.willFollowScript,
      }
      await createListing({
        variables: { input: { ...input, iconUrl: icons[selectedIconIdx].url } },
      })
      onListingSubmit()
      // submit and then navigate (or render) create success
    } catch (error) {
      Sentry.captureException(error)
      console.log('error: ', error)
    }
  }

  const handleIconSelect = idx => {
    setSelectedIconIdx(idx)
  }

  const gridProps = {
    templateColumns: [
      'repeat(1, 1fr)',
      null,
      'repeat(3, 1fr)',
      'repeat(4, 1fr)',
    ],
    columnGap: 10,
  }

  return (
    <Layout user={user}>
      <Container as="form" py={9} onSubmit={handleSubmit(onSubmit)}>
        <chakra.h2 textStyle={['h4body', 'h2body']} mb={6}>
          Create a Sponsorship Listing
        </chakra.h2>
        <Text textStyle="small" color={gray[600]} mb={10} maxW={MAX_COL_WIDTH}>
          Fill out this form to get sponsored! We will reach out to you
          afterwards to verify your sponsorship listing.
        </Text>
        <Grid {...gridProps}>
          <GridItem colSpan={[1, null, 2]}>
            <Flex maxW={MAX_COL_WIDTH} mb={8}>
              <FormInput
                flex={1}
                mr={5}
                label="Listing Name"
                error={errors.name}
                variant="outline"
                inputProps={{
                  placeholder: 'eg. My First Stream',
                  ...register('name', {
                    required: true,
                  }),
                }}
              />
              <FormControl flex={1}>
                <FormLabel>Deliverable</FormLabel>
                <Select
                  variant="rounded"
                  {...register('platformAndDeliverable')}
                >
                  <option>TikTok Dedicated</option>
                  <option>YouTube Dedicated</option>
                  <option>YouTube Pre-roll</option>
                  <option>YouTube Post-roll</option>
                  <option>YouTube Mid-roll</option>
                  <option>YouTube Stream</option>
                  <option>YouTube Short</option>
                </Select>
              </FormControl>
            </Flex>
            <FormControl maxW={MAX_COL_WIDTH} isInvalid={!!errors.description}>
              <FormLabel htmlFor="description">
                Describe what you&apos;d like to do for a sponsorship?
              </FormLabel>
              <Textarea
                placeholder={`eg. "I will promote your product for 30 seconds on my YouTube videos until they reach 150k total views." (max. 600 characters)`}
                rows={4}
                mb={8}
                maxLength={600}
                {...register('description', { required: true })}
              />
            </FormControl>
          </GridItem>
          <GridItem
            colSpan={1}
            width={['calc(55vw)', 'calc(30vw)', 'calc(20vw)', 'calc(15vw)']}
            mb={[8, null, 0]}
          >
            <FormLabel>Choose Icon</FormLabel>
            <IconSelector data={icons} onSelect={handleIconSelect} />
          </GridItem>
        </Grid>
        {/* advanced options */}
        <Accordion allowToggle maxW={MAX_COL_WIDTH + 100}>
          <AccordionItem>
            <h2>
              <AccordionButton mb={6}>
                <Box textAlign="left" textStyle="baseBold" mr={4}>
                  Advanced Options
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel textStyle="baseBold">
              <AdvancedRow
                label="Number of revisions"
                description="How many times can a brand suggest non-major changes to the sponsored work?"
                selectProps={{
                  children: (
                    <>
                      <option value={''}>-</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </>
                  ),
                  ...register('numberOfRevisions'),
                }}
              />
              <AdvancedRow
                label="Preview days"
                description="How long can the brand preview your work and suggest edits before it's live?"
                selectProps={{
                  children: (
                    <>
                      <option value={''}>-</option>
                      <option value={3}>3</option>
                      <option value={7}>7</option>
                      <option value={14}>14</option>
                    </>
                  ),
                  ...register('previewTime'),
                }}
              />
              <AdvancedRow
                label="Will the media be reusable?"
                description="Can the brand reuse the work in other places? (eg. making it a Facebook ad)"
                selectProps={{
                  children: (
                    <>
                      <option value={''}>-</option>
                      <option>Yes</option>
                      <option>No</option>
                    </>
                  ),
                  ...register('canReuse'),
                }}
              />
              <AdvancedRow
                label="Would you follow a script provided by the sponsor?"
                selectProps={{
                  children: (
                    <>
                      <option value={''}>-</option>
                      <option>Yes</option>
                      <option>No</option>
                    </>
                  ),
                  ...register('willFollowScript'),
                }}
              />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Divider mb={8} maxW={MAX_COL_WIDTH + 100} />
        {/* Address section */}
        <Text textStyle={'xLarge'} fontWeight={700} mb={4}>
          Shipping Address
        </Text>
        <Text textStyle="small" color={gray[600]} mb={8} maxW={MAX_COL_WIDTH}>
          Use a permanent address where you can receive the product.
        </Text>
        <AddressForm
          register={register}
          errors={errors}
          gridProps={gridProps}
          registerOptions={{
            streetAddress: { required: true },
            city: { required: true },
            state: { required: true },
            zip: {
              required: true,
              minLength: {
                value: 5,
                message: 'ZIP/Postal code too short',
              },
            },
          }}
        />
        <Button
          disabled={isSubmitting}
          type="submit"
          rightIcon={<ArrowForwardIcon />}
        >
          Create Listing
        </Button>
      </Container>
    </Layout>
  )
}

export default CreateListingForm
