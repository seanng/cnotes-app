import {
  InputRightElement,
  InputGroup,
  FormErrorMessage,
  Text,
  FormControl,
  Button,
  Input,
} from '@chakra-ui/react'
import DealStageBody from 'components/molecules/DealStageBody'
import { useForm } from 'react-hook-form'
import { PAYING, URL_REGEX } from 'shared/constants'
import { useMutation, gql } from '@apollo/client'
import { Deal } from 'shared/types'

const UPDATE_DEAL = gql`
  mutation updateDeal($id: ID!, $payload: UpdateDealInput!) {
    updateDeal(id: $id, payload: $payload) {
      id
      status
      submittedUrl
      submittedAt
    }
  }
`

interface Props {
  deal: Deal
}

export default function SubmittingStage({ deal }: Props): JSX.Element {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
  const [updateDeal] = useMutation(UPDATE_DEAL)

  const onSubmit = async ({ submittedUrl }): Promise<void> => {
    await updateDeal({
      variables: { id: deal.id, payload: { submittedUrl, status: PAYING } },
    })
  }

  return (
    <DealStageBody deal={deal}>
      <Text textStyle="base" mb={4}>
        Look out for an email from us with instructions on how to connect with
        your brand partner.
      </Text>
      <Text textStyle="base" mb={5}>
        Once your video is final, paste the URL here to complete the job.
      </Text>
      <FormControl
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        isInvalid={!!errors.submittedUrl}
      >
        <InputGroup size="lg">
          <Input
            variant="rounded"
            placeholder="https://youtube.com/watch?v=Z59dZw5yuNQ"
            autoComplete="off"
            {...register('submittedUrl', {
              required: true,
              pattern: {
                value: URL_REGEX,
                message: 'URL must be valid and contain "https://"',
              },
            })}
          />
          <InputRightElement width="5rem">
            <Button h="full" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </InputRightElement>
        </InputGroup>
        {errors?.submittedUrl && (
          <FormErrorMessage color="red">
            {errors.submittedUrl.message}
          </FormErrorMessage>
        )}
      </FormControl>
    </DealStageBody>
  )
}
