import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { FC } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
  onSubmit: ({ input }: { input: number }) => void
  minBid: number
}

const BidInput: FC<Props> = ({ onSubmit, minBid }: Props) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({ mode: 'onChange' })

  const onFormSubmit = (data): void => {
    reset()
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <InputGroup w={115}>
        <Input
          borderRadius="full"
          type="number"
          placeholder="Bid"
          {...register('input', {
            min: minBid,
            required: true,
          })}
        />
        <InputRightElement>
          <IconButton
            type="submit"
            borderRadius="full"
            disabled={!isValid || isSubmitting}
            aria-label="Bid"
            icon={<ArrowForwardIcon />}
          />
        </InputRightElement>
      </InputGroup>
    </form>
  )
}

export default BidInput
