import {
  Box,
  Container,
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
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { NextPage } from 'next'
import Layout from 'components/organisms/Layout'
import { useForm } from 'react-hook-form'
import * as R from 'ramda'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import DatePicker from 'components/atoms/DatePicker'
import 'react-datepicker/dist/react-datepicker.css'
import { User } from 'shared/types'

const CreateOfferMutation = gql`
  mutation CreateOfferMutation($input: CreateOfferInput!) {
    createOffer(input: $input) {
      _id
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
  onOfferSubmit: () => void
}

const CreateOfferForm: NextPage<Props> = ({ user, onOfferSubmit }: Props) => {
  const [createOffer] = useMutation(CreateOfferMutation)
  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const deliveryStartsAt = watch('deliveryStartsAt')

  const onSubmit = async (data: OnSubmitProps): Promise<void> => {
    try {
      // Add withNull so it's easier for Michael to see what fields are missing from form.
      const withNull = R.map(x => (x ? x : null), data)
      const { numberOfRevisions, revisionDays, canReuse, willFollowScript } =
        withNull
      const input = {
        ...withNull,
        ...(numberOfRevisions && {
          numberOfRevisions: Number(numberOfRevisions),
        }),
        ...(revisionDays && {
          revisionDays: Number(revisionDays),
        }),
        ...(canReuse && {
          canReuse: canReuse === 'Yes',
        }),
        ...(willFollowScript && {
          willFollowScript: willFollowScript === 'Yes',
        }),
      }

      const {
        data: { createOffer: payload },
      } = await createOffer({
        variables: {
          input,
        },
      })
      onOfferSubmit()
      console.log('data: ', payload)
      // submit and then navigate (or render) create success
    } catch (error) {
      console.log('error: ', error)
    }
  }

  return (
    <Layout user={user}>
      <Container py={[16, 20]}>
        <Flex>
          <Box flex={2} as="form" onSubmit={handleSubmit(onSubmit)}>
            <chakra.h2 textStyle="h2" mb={6}>
              Create an offer
            </chakra.h2>
            <Text color="neutrals4" mb={10} maxW={600}>
              Being connected to brands is invite only. Fill out this form to
              apply for VIP access to our marketplace. We will reach out if
              there is a fit.
            </Text>
            <Flex maxW={600} mb={10}>
              <FormControl flex={1} mr={5}>
                <FormLabel>Platform</FormLabel>
                <Select {...register('platform')}>
                  <option value={''}>I&apos;m not sure</option>
                  <option>YouTube</option>
                  <option>TikTok</option>
                </Select>
              </FormControl>
              <FormControl flex={1}>
                <FormLabel>Deliverable</FormLabel>
                <Select {...register('deliverable')}>
                  <option value={''}>I&apos;m not sure</option>
                  <option>Integration</option>
                  <option>Dedicated</option>
                </Select>
              </FormControl>
            </Flex>
            <FormControl mb={10}>
              <FormLabel
                htmlFor="when"
                color={
                  errors.deliveryStartsAt || errors.end ? 'red' : 'neutrals5'
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
            </FormControl>
            <FormControl maxW={600} isInvalid={errors.description}>
              <FormLabel htmlFor="description">
                Describe what you&apos;d like to do for a sponsorship?
              </FormLabel>
              <Textarea
                placeholder={`eg. "I will promote your product for 30 seconds on my YouTube videos until they reach 150k total views."`}
                mb={10}
                {...register('description', { required: true })}
              />
            </FormControl>

            {/* advanced options */}
            <Accordion allowToggle mb={6}>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box
                      textAlign="left"
                      textStyle="caption1"
                      fontWeight="bold"
                      mr={4}
                    >
                      Advanced Options
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel textStyle="body2">
                  <Flex mb={8}>
                    <Flex direction="column">
                      <Box mb={1}>Number of Revisions</Box>
                      <Box textStyle="caption2" color="neutrals4">
                        How many times can a brand suggest non-major changes to
                        the sponsored work?
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
                  <Flex mb={8}>
                    <Flex direction="column">
                      <Box mb={1}>Revision Time</Box>
                      <Box textStyle="caption2" color="neutrals4">
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
                  <Flex mb={8}>
                    <Flex direction="column">
                      <Box mb={1}>Will the media be reusable?</Box>
                      <Box textStyle="caption2" color="neutrals4">
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
                  <Flex mb={8} align="center">
                    <Flex direction="column">
                      <Box>
                        Would you follow a script provided by the sponsor?
                      </Box>
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
          </Box>
          <Box flex={1} display={{ base: 'none', lg: 'block' }}>
            tiktok video.
          </Box>
        </Flex>
      </Container>
    </Layout>
  )
}

export default CreateOfferForm
