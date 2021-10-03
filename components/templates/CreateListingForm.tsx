import {
  Box,
  Container,
  Grid,
  GridItem,
  Flex,
  chakra,
  Text,
  FormControl,
  FormLabel,
  Textarea,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Spacer,
  Select,
} from '@chakra-ui/react'
import { useMutation, gql } from '@apollo/client'
import { useState } from 'react'
import FormInput from 'components/atoms/FormInput'
import { NextPage } from 'next'
import { useColors } from 'utils/colors'
import Layout from 'components/organisms/Layout'
import { useForm } from 'react-hook-form'
import * as R from 'ramda'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import IconSelector from 'components/molecules/IconSelector'
// import DatePicker from 'components/atoms/DatePicker'
import 'react-datepicker/dist/react-datepicker.css'
import { S3_LISTING_ICONS_FOLDER } from 'shared/constants'
import { User } from 'shared/types'

const MAX_COL_WIDTH = 600

const CREATE_LISTING = gql`
  mutation createListing($input: CreateListingInput!) {
    createListing(input: $input) {
      id
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
  revisionDays: string
  numberOfRevisions: string
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

const CreateListingForm: NextPage<Props> = ({
  user,
  onListingSubmit,
}: Props) => {
  const [selectedIconIdx, setSelectedIconIdx] = useState(0)
  const [createListing] = useMutation(CREATE_LISTING)
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
  const { gray } = useColors()

  const onSubmit = async (data: OnSubmitProps): Promise<void> => {
    try {
      const input = R.pipe(
        R.omit([
          'numberOfRevisions',
          'revisionDays',
          'canReuse',
          'willFollowScript',
        ]),
        R.set(R.lensProp('specs'), [])
      )(data)

      data.numberOfRevisions &&
        input.specs.push({
          key: 'Number of revisions',
          value: data.numberOfRevisions,
        })
      data.revisionDays &&
        input.specs.push({
          key: 'Revision days',
          value: data.revisionDays,
        })
      data.canReuse &&
        input.specs.push({
          key: 'Reusable?',
          value: data.canReuse,
        })
      data.willFollowScript &&
        input.specs.push({
          key: 'Will follow script?',
          value: data.willFollowScript,
        })

      await createListing({
        variables: { input: { ...input, iconUrl: icons[selectedIconIdx].url } },
      })
      onListingSubmit()
      // submit and then navigate (or render) create success
    } catch (error) {
      console.log('error: ', error)
    }
  }

  const handleIconSelect = idx => {
    setSelectedIconIdx(idx)
  }

  return (
    <Layout user={user}>
      <Container as="form" py={[16, 20]} onSubmit={handleSubmit(onSubmit)}>
        <chakra.h2 textStyle={['h4', 'h2']} mb={6}>
          Create a Sponsorship Listing
        </chakra.h2>
        <Text color={gray[600]} mb={10} maxW={MAX_COL_WIDTH}>
          Being connected to brands is invite only. Fill out this form to apply
          for VIP access to our marketplace. We will reach out if there is a
          fit.
        </Text>
        <Grid
          templateColumns={[
            'repeat(1, 1fr)',
            null,
            'repeat(3, 1fr)',
            'repeat(4, 1fr)',
          ]}
          columnGap={10}
        >
          <GridItem colSpan={[1, null, 2]}>
            <Flex maxW={MAX_COL_WIDTH} mb={8}>
              <FormInput
                flex={1}
                mr={5}
                label="Listing Name"
                error={errors.name}
                inputProps={{
                  placeholder: 'eg. My First Integration',
                  ...register('name', {
                    required: true,
                  }),
                }}
              />
              <FormControl flex={1}>
                <FormLabel>Deliverable</FormLabel>
                <Select {...register('platformAndDeliverable')}>
                  <option value={''}>I&apos;m not sure</option>
                  <option>YouTube Integration</option>
                  <option>YouTube Dedicated</option>
                  <option>TikTok Integration</option>
                  <option>TikTok Dedicated</option>
                </Select>
              </FormControl>
            </Flex>
            {/* <FormControl mb={10}>
              <FormLabel
                htmlFor="when"
                color={
                  errors.deliveryStartsAt || errors.end ? 'red' : 'gray.500'
                }
              >
                When are you available to post the sponsored work?
              </FormLabel>
              <Flex>
                <DatePicker
                  controllerProps={{
                    control: control,
                    name: 'deliveryStartsAt',
                    rules: { required: true },
                  }}
                  inputProps={{
                    w: 140,
                    id: 'deliveryStartsAt',
                    mr: 10,
                    isInvalid: errors.deliveryStartsAt,
                  }}
                  minDate={new Date()}
                  placeholderText="Start"
                />
                <DatePicker
                  controllerProps={{
                    control: control,
                    name: 'deliveryEndsAt',
                    rules: { required: true },
                  }}
                  inputProps={{
                    w: 140,
                    id: 'deliveryEndsAt',
                    isInvalid: errors.deliveryEndsAt,
                  }}
                  minDate={deliveryStartsAt}
                  placeholderText="End"
                />
              </Flex>
            </FormControl> */}
            <FormControl maxW={MAX_COL_WIDTH} isInvalid={errors.description}>
              <FormLabel htmlFor="description">
                Describe what you&apos;d like to do for a sponsorship?
              </FormLabel>
              <Textarea
                placeholder={`eg. "I will promote your product for 30 seconds on my YouTube videos until they reach 150k total views."`}
                mb={10}
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
        <Accordion allowToggle maxW={MAX_COL_WIDTH + 100} mb={8}>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box textAlign="left" textStyle="small" fontWeight={700} mr={4}>
                  Advanced Options
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel textStyle="base">
              <Flex mb={6}>
                <Flex direction="column">
                  <Box mb={1}>Number of Revisions</Box>
                  <Box textStyle="mini" color={gray[600]}>
                    How many times can a brand suggest non-major changes to the
                    sponsored work?
                  </Box>
                </Flex>
                <Spacer />
                <Select w={110} {...register('numberOfRevisions')}>
                  <option value={''}>-</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </Select>
              </Flex>
              <Flex mb={6}>
                <Flex direction="column">
                  <Box mb={1}>Revision Time</Box>
                  <Box textStyle="mini" color={gray[600]}>
                    When can the brand preview your work and suggest edits
                    before it goes live?
                  </Box>
                </Flex>
                <Spacer />
                <Select w={110} {...register('revisionDays')}>
                  <option value={''}>-</option>
                  <option value={3}>3 days</option>
                  <option value={7}>7 days</option>
                  <option value={14}>14 days</option>
                </Select>
              </Flex>
              <Flex mb={6}>
                <Flex direction="column">
                  <Box mb={1}>Will the media be reusable?</Box>
                  <Box textStyle="mini" color={gray[600]}>
                    Will the brand get a license to reuse the work in other
                    places? (eg. making it into a Facebook ad)
                  </Box>
                </Flex>
                <Spacer />
                <Select w={110} {...register('canReuse')}>
                  <option value={''}>-</option>
                  <option>Yes</option>
                  <option>No</option>
                </Select>
              </Flex>
              <Flex align="center">
                <Flex direction="column">
                  <Box>Would you follow a script provided by the sponsor?</Box>
                </Flex>
                <Spacer />
                <Select w={110} {...register('willFollowScript')}>
                  <option value={''}>-</option>
                  <option>Yes</option>
                  <option>No</option>
                </Select>
              </Flex>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Button
          disabled={isSubmitting}
          type="submit"
          rightIcon={<ArrowForwardIcon />}
        >
          Apply
        </Button>
      </Container>
    </Layout>
  )
}

export default CreateListingForm
