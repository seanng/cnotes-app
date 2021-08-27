import {
  Box,
  Container,
  Flex,
  chakra,
  Text,
  FormControl,
  FormLabel,
  Input,
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
import { NextPage } from 'next'
import Layout from 'components/organisms/Layout'
import { useForm } from 'react-hook-form'
import { ArrowForwardIcon } from '@chakra-ui/icons'

type OnSubmitProps = {
  deliverable: string
  start: string
  end: string
  description: string
}

const CreatePage: NextPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data: OnSubmitProps): Promise<void> => {
    try {
      console.log('data: ', data)
      // submit and then navigate (or render) create success
    } catch (error) {
      console.log('error: ', error)
    }
  }

  return (
    <Layout>
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
            <FormControl mb={10}>
              <FormLabel
                htmlFor="when"
                color={errors.start || errors.end ? 'red' : 'neutrals5'}
              >
                When are you available to post the sponsored work?
              </FormLabel>
              <Flex>
                <Input
                  w={100}
                  id="start"
                  mr={10}
                  isInvalid={errors.start}
                  placeholder="Start"
                  {...register('start', { required: true })}
                />
                <Input
                  w={100}
                  id="end"
                  isInvalid={errors.end}
                  placeholder="End"
                  {...register('end', { required: true })}
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
                      <option selected value={null}>
                        -
                      </option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
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
                      <option selected value={null}>
                        -
                      </option>
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
                      <option value={null} selected>
                        -
                      </option>
                      <option value={1}>Yes</option>
                      <option value={0}>No</option>
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
                      <option value={null} selected>
                        -
                      </option>
                      <option value={1}>Yes</option>
                      <option value={0}>No</option>
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

export default CreatePage
