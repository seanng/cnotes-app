import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'

import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Offer } from 'shared/types'

type Props = {
  offer: Offer
}

const BidInput: FC<Props> = ({ offer }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, isValid },
  } = useForm({ mode: 'onChange' })

  const onSubmit = ({ input }: { input: number }): void => {
    console.log('input: ', input)
    // open modal
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup w={115}>
        <Input
          borderRadius="full"
          type="number"
          placeholder="Bid"
          {...register(offer.id, {
            required: true,
          })}
        />
        <InputRightElement>
          <IconButton
            type="submit"
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
